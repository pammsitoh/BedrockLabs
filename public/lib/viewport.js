class Viewport {
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.container = document.querySelector('#viewport');

        this.texture_loader = new THREE.TextureLoader();
        this.textures = [];

        // Variables para el control del mouse
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.isMouseDown = false;
        this.isDragging = false;

        this.rotationSpeed = 0.005;

        // Punto central alrededor del cual se realizará la rotación
        this.centralPoint = new THREE.Vector3(0, 0, 0);

        this.cameraRotationSpeed = 0.005;
        this.cameraDistance = 10;
        this.cameraAngleX = 0;
        this.cameraAngleY = 0;
        this.clickDetected = false;

        //Extra
        this.selected_object;

        //Editor
        this.gizmos;
        this.rayline;
        this.infiniteGrid;
        this.type_drag = 0;
    }

    /**
     * @description Todo lo relacionado con el renderer...
     */
    setupRenderer(){
        //Escala...
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.needsUpdate = true;
        this.renderer.gammaOutput = false;
    }

    /**
     * @description Todo lo relacionado con la escena...
     */
    setupScene(){
        //Color de fondo del viewport...
        this.scene.background = new THREE.Color(0x121212);

        //ADD Luz Ambiental...
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);

        //ADD Luz Directional...
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.castShadow = true;
        directionalLight.position.set(3, 10, 5);

        // Crea una caja
        const geometriaCaja = new THREE.BoxGeometry();
        const materialCaja = new THREE.MeshStandardMaterial({ map: this.textures[0] });
        const caja = new THREE.Mesh(geometriaCaja, materialCaja);
        caja.renderOrder = 1;
        caja.name = "Copper Block"
        caja.position.y = 0.5;
        caja.rotation.x += 0;
        caja.userData.canClick = true;

        // Llama a la función para crear la cuadrícula infinita
        this.infiniteGrid = this.createInfiniteGrid(15, 15, 0x383838, 0x4a0045);
        this.infiniteGrid.renderOrder = 0;

        // Llama a la función para crear el gizmo de ejes
        const axisGizmo = this.createAxisGizmo(1); // El valor 1 define la longitud de los ejes
        axisGizmo.renderOrder = 2;
        axisGizmo.userData.canClick = true;
        axisGizmo.userData.isGizmo = true;
        axisGizmo.position.set(0, 0.5, 0); // Ajusta la posición según tus necesidades

        //RAYCAST LINE
        const rayLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 5 });
        const rayLineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const rayLine = new THREE.Line(rayLineGeometry, rayLineMaterial);

        //AXES HELPER
        const axesHelper = new THREE.AxesHelper( 7.5 );
        axesHelper.renderOrder = 0;


        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
        this.scene.add(caja);
        this.scene.add(this.infiniteGrid);
        this.scene.add(rayLine);
        this.scene.add(axisGizmo);
        this.scene.add(axesHelper);

        this.selected_object = caja;
        this.rayline = rayLine;
        this.gizmos = axisGizmo;
    }

    /**
     * @description Todo lo relacionado con la camara...
     */
    setupCamera(){
        this.camera.position.z = 5; // Mueve la cámara hacia atrás
    }

    /**
     * @description Carga de texturas...
     */
    textureLoader() {

        let copper = this.texture_loader.load('assets/textures/blocks/copper_block.png');
        copper.minFilter = THREE.NearestFilter;
        copper.magFilter = THREE.NearestFilter;

        let bookshelf = this.texture_loader.load('assets/textures/blocks/chiseled_bookshelf_top.png')
        bookshelf.magFilter = THREE.NearestFilter
        bookshelf.minFilter = THREE.NearestFilter


        this.textures.push(copper);
        this.textures.push(bookshelf);
    }

    addCube(){
        // Crea una caja
        const geometriaCaja = new THREE.BoxGeometry();
        const materialCaja = new THREE.MeshStandardMaterial({ map: this.textures[1] });
        const caja = new THREE.Mesh(geometriaCaja, materialCaja);
        caja.name = "Chiseled Bookshelf"
        caja.renderOrder = 1;
        caja.position.y = 1.5;
        caja.rotation.x += 0;
        caja.userData.canClick = true;
        caja.userData.bedrockElement = {
            type: "block",
            source: {}
        };

        this.scene.add(caja);

        caja.on('click', (ev) => {
            console.log(ev);
        });
        contextMenu.style.display = "none";
    }

    addEntity(){
        // Crea una caja
        const geometriaCaja = new THREE.BoxGeometry();
        const materialCaja = new THREE.MeshStandardMaterial({ map: this.textures[1] });
        const caja = new THREE.Mesh(geometriaCaja, materialCaja);
        caja.name = "Entidad"
        caja.renderOrder = 1;
        caja.position.y = 1.5;
        caja.rotation.x += 0;
        caja.userData.canClick = true;
        caja.userData.bedrockElement = {
            type: "entity",
            source: {}
        };

        this.scene.add(caja);

        caja.on('click', (ev) => {
            console.log(ev);
        });
        contextMenu.style.display = "none";
    }

    /**
     * @description Registrar eventos...
     */
    eventListeners() {

        //Escalar...
        window.addEventListener('resize', () => {
            const nuevoAncho = window.innerWidth;
            const nuevoAlto = window.innerHeight;
        
            this.camera.aspect = nuevoAncho / nuevoAlto;
            this.camera.updateProjectionMatrix();
        
            this.renderer.setSize(nuevoAncho, nuevoAlto);
        });

        // Agrega un evento de escucha para el movimiento del mouse
        this.container.addEventListener('mousemove', (event) => {

            // Obtiene la posición relativa del canvas en la ventana
            const canvasRect = this.renderer.domElement.getBoundingClientRect();
            // Calcula la posición normalizada del mouse (-1 a 1)
            this.mouse.x = ((event.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;

            // Si se mantiene presionado el botón del mouse y no se está arrastrando,
            // inicia la rotación de la cámara
            if (this.isMouseDown && !this.isDragging) {
                this.isDragging = true;
            }

            // Si se está arrastrando, actualiza la posición de la cámara
            if (this.isDragging) {
                if(this.type_drag == 0){
                    // Calcula la diferencia de posición del mouse en X y Y
                    const deltaX = event.movementX * this.cameraRotationSpeed;
                    const deltaY = event.movementY * this.cameraRotationSpeed;

                    // Actualiza los ángulos de rotación de la cámara
                    this.cameraAngleX += deltaX;
                    this.cameraAngleY += deltaY;

                    // Limita el ángulo vertical entre -PI/2 y PI/2 para evitar que la cámara gire hacia arriba y abajo
                    this.cameraAngleY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.cameraAngleY));

                    // Calcula la nueva posición de la cámara en coordenadas esféricas
                    const x = this.cameraDistance * Math.cos(this.cameraAngleX) * Math.cos(this.cameraAngleY);
                    const y = this.cameraDistance * Math.sin(this.cameraAngleY);
                    const z = this.cameraDistance * Math.sin(this.cameraAngleX) * Math.cos(this.cameraAngleY);

                    // Actualiza la posición y la dirección de la cámara
                    this.camera.position.set(x, y, z);
                    this.camera.lookAt(this.centralPoint);
                }else if (this.type_drag >= 1 && this.type_drag <= 3 && this.selected_object) {
                    const objectPosition = this.selected_object.position;
                    const sensitivity = 0.1;
                
                    switch (this.type_drag) {
                        case 1:
                            objectPosition.x += -event.movementX * sensitivity;
                            break;
                        case 2:
                            objectPosition.y += -event.movementY * sensitivity;
                            break;
                        case 3:
                            objectPosition.z += -event.movementY * sensitivity;
                            break;
                        default:
                            break;
                    }
                }
                
            }
        });

        

        // Agrega eventos de escucha para el inicio y final del clic del mouse
        this.container.addEventListener('mousedown', (event) => {
            this.isMouseDown = true;

            // Calcula la posición normalizada del mouse (-1 a 1)
            const mouse = new THREE.Vector2();
            const canvasRect = this.renderer.domElement.getBoundingClientRect();
                // Calcula la posición normalizada del mouse (-1 a 1)
            mouse.x = ((event.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
            mouse.y = -((event.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;

            // Actualiza el raycaster
            this.raycaster.setFromCamera(mouse, this.camera);

            // Calcula objetos intersectados por el raycaster
            const intersects = this.raycaster.intersectObjects(this.scene.children);
            let pt_panel = document.querySelector("#property_panel");

            // Si se han encontrado intersecciones, selecciona el primer objeto
            if (intersects.length > 0) {
                const theintersect = intersects.find( i => i?.object.userData.canClick == true);
                //console.log(intersects[0].object.name);
                if( theintersect == null ) return;
                
                console.log(theintersect.object.type);

                if(theintersect.object.userData.isGizmo){
                    console.log("GIZMO");
                    if(theintersect.object.userData.isGizmoX){
                        this.type_drag = 1;
                    }else if(theintersect.object.userData.isGizmoY){
                        this.type_drag = 2;
                    }else if(theintersect.object.userData.isGizmoZ){
                        this.type_drag = 3;
                    }
                    return;
                }

                this.selected_object = theintersect.object;
                this.type_drag = 0;

                pt_panel.classList.add('block');
                pt_panel.classList.remove('hidden');

                //Actualizar Panel Propiedades
                let pt_name = document.querySelector("#property_name");
                let pt_position = document.querySelector("#property_position");

                pt_name.innerHTML = `Name: <input class="bg-zinc-950" type="text" value="${this.selected_object.name}" />`
                pt_position.innerHTML = `Position: ${this.selected_object.position.x}, ${this.selected_object.position.y}, ${this.selected_object.position.z}`
                
                // Puedes realizar acciones en el objeto seleccionado aquí
                console.log("Objeto seleccionado:", this.selected_object);
                
                this.gizmos.visible = true;

            } else {
                // No se ha encontrado ningún objeto, por lo que limpiamos la selección
                pt_panel.classList.add('hidden');
                pt_panel.classList.remove('block');
                this.selected_object = null;
                this.gizmos.visible = false;
            }
        });

        this.container.addEventListener('mouseup', () => {
            this.isMouseDown = false;
            this.type_drag = 0;
            this.isDragging = false; // Detiene la rotación al soltar el botón del mouse

            this.selected_object.position.x = Math.round(this.selected_object.position.x);
            this.selected_object.position.y = Math.round(this.selected_object.position.y) - 0.5;
            this.selected_object.position.z = Math.round(this.selected_object.position.z);
        });

        // Agrega un evento de escucha para el movimiento de la rueda del ratón
        this.container.addEventListener('wheel', (event) => {
            // Ajusta la distancia de la cámara en función de la dirección de desplazamiento de la rueda
            this.cameraDistance += event.deltaY * 0.05;

            // Limita la distancia de la cámara para evitar que se acerque demasiado o se aleje demasiado
            this.cameraDistance = Math.max(2, Math.min(20, this.cameraDistance));

            // Calcula la nueva posición de la cámara en coordenadas esféricas
            const x = this.cameraDistance * Math.cos(this.cameraAngleX) * Math.cos(this.cameraAngleY);
            const y = this.cameraDistance * Math.sin(this.cameraAngleY);
            const z = this.cameraDistance * Math.sin(this.cameraAngleX) * Math.cos(this.cameraAngleY);

            // Actualiza la posición y la dirección de la cámara
            this.camera.position.set(x, y, z);
            this.camera.lookAt(this.centralPoint);
        });

    }

    //UTILS... <<<----------------------------------------->>>

    /**
     * @description Ajustar el viewport a su div padre...
     */
    adjustDomRenderer = () => {
        const nuevoAncho = this.container.clientWidth;
        const nuevoAlto = this.container.clientHeight;
    
        // Ajusta el tamaño del renderizador
        this.renderer.setSize(nuevoAncho, nuevoAlto);
    
        // Actualiza la relación de aspecto de la cámara
        this.camera.aspect = nuevoAncho / nuevoAlto;
        this.camera.updateProjectionMatrix();
    }

    /**
     * @event
     * @param {*} event 
     */
    onMouseClick = (event) => {
        
    }

    // Actualiza la opacidad de las líneas de la cuadrícula en función de la distancia a la cámara
    updateGridOpacity = (grid, camera) => {
        const gridLines = grid.children[0];

        // Define la distancia a partir de la cual las líneas se vuelven completamente transparentes
        const maxDistance = 50; // Puedes ajustar este valor según tus necesidades

        // Obtiene la posición de la cámara
        const cameraPosition = new THREE.Vector3();
        cameraPosition.setFromMatrixPosition(camera.matrixWorld);

        // Calcula la distancia entre la cámara y el centro de la cuadrícula
        const distanceToGrid = cameraPosition.distanceTo(grid.position);

        // Calcula la opacidad en función de la distancia
        const opacity = Math.max(0, 1 - distanceToGrid / maxDistance);

        // Actualiza la opacidad de los materiales de las líneas
        gridLines.material.opacity = opacity;
    }

    // Crea una cuadrícula infinita
    createInfiniteGrid = (size, divisions, color1, color2) => {
        const gridGeometry = new THREE.BufferGeometry();
        const gridMaterial = new THREE.LineBasicMaterial({ color: color1 });

        const step = size / divisions;
        const halfSize = size / 2;
        const vertices = [];

        for (let i = -halfSize; i <= halfSize; i += step) {
            vertices.push(-halfSize, 0, i);
            vertices.push(halfSize, 0, i);
            vertices.push(i, 0, -halfSize);
            vertices.push(i, 0, halfSize);
        }

        gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
        grid.material.color.set(color1);

        // Crea una malla alternativa para las líneas principales si lo deseas
        const mainGridMaterial = new THREE.LineBasicMaterial({ color: color2 });
        const mainGridGeometry = new THREE.BufferGeometry();
        const mainVertices = [-halfSize, 0, 0, halfSize, 0, 0, 0, 0, -halfSize, 0, 0, halfSize];
        mainGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(mainVertices, 3));
        const mainGrid = new THREE.LineSegments(mainGridGeometry, mainGridMaterial);

        const infiniteGrid = new THREE.Group();
        infiniteGrid.add(grid);

        return infiniteGrid;
    }

    // Función para crear un gizmo de ejes
    createAxisGizmo = (size) => {
        const gizmo = new THREE.Group();
        const nodt = new THREE.MeshStandardMaterial({
            depthTest: false
        });

        const axisX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), size, 0xff0000, 0.2, 0.2);
        const axisY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), size, 0x00ff00, 0.2, 0.2);
        const axisZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), size, 0x0000ff, 0.2, 0.2);
        
        axisX.material = nodt;
        axisY.material = nodt;
        axisZ.material = nodt;

        axisX.cone.userData.canClick = true;
        axisY.cone.userData.canClick = true;
        axisZ.cone.userData.canClick = true;

        axisX.cone.userData.isGizmo = true;
        axisY.cone.userData.isGizmo = true;
        axisZ.cone.userData.isGizmo = true;

        axisX.cone.userData.isGizmoX = true;
        axisY.cone.userData.isGizmoY = true;
        axisZ.cone.userData.isGizmoZ = true;

        gizmo.add(axisX, axisY, axisZ);

        gizmo.renderOrder = 1;
        return gizmo;
    }

    // Función para recorrer todos los objetos en la escena
    traverseScene = (scene) => {
        let items = [];
        let zone = document.querySelector("#objects");
        zone.innerHTML = ``;
        scene.traverse(function (object) {

            if(object.name != "") {
                
                let icon = "";

                if(object.userData.bedrockElement?.type == "block"){
                    icon = `<i class="fa-solid fa-cube"></i>`
                }else if(object.userData.bedrockElement?.type == "entity"){
                    icon = `<i class="fa-solid fa-robot"></i>`
                }else {
                    icon = `<i class="fa-solid fa-question"></i>`
                }

                let doom = `<li class="bg-zinc-700 text-white p-1 m-2 text-sm">${icon} ${object.name}</li>`

                zone.innerHTML = zone.innerHTML + `\n ${doom}`

                // Puedes realizar otras acciones, como cambiar su posición, material, etc.
                // object.position.x += 1;

            }

            
        });
    }

    //ANIMAR
    animate = () => {
        requestAnimationFrame(this.animate);
    
        // Actualiza aquí la animación
        this.updateGridOpacity(this.infiniteGrid, this.camera);
        this.adjustDomRenderer();
        this.traverseScene(this.scene);

        if( this.selected_object != null && this.selected_object.type == "Mesh" ){
            this.gizmos.position.copy(this.selected_object.position);
        }

        //RAYLINE
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.render(this.scene, this.camera);
        this.gizmos.scale.x = this.cameraDistance / 8;
        this.gizmos.scale.y = this.cameraDistance / 8;
        this.gizmos.scale.z = this.cameraDistance / 8;
    }

    /**
     * @description Iniciar...
     */
    onStart(){
        
        this.textureLoader();
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.eventListeners();
        
        this.container.appendChild(this.renderer.domElement);

        this.animate();

    }
}