const { LevelDB } = require('leveldb-zlib')
const { WorldProvider } = require('bedrock-provider')
const registry = require('prismarine-registry')('bedrock_1.17.10')
const ChunkColumn = require('prismarine-chunk')(registry)
const Block = require('prismarine-block')(registry)

const fs = require('fs')
const assert = require('assert')
const { Version } = require('bedrock-provider/js/versions')

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, 
         function (match) {
              return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
         });
}

async function test () {
  // Create a new ChunkColumn
  const cc = new ChunkColumn({ x: 0, z: 0 })

  const l = 0 // Storage layer
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      for (var z = 0; z < 4; z++) {
        // Set a random block ID
        const id = Math.floor(Math.random() * 1000)
        const block = Block.fromStateId(id)
        cc.setBlock({ l, x, y, z }, block)
        const gotblock = cc.getBlock({ l, x, y, z })
        assert.strictEqual(gotblock.stateId, id)
      }
    }
  }

  // Now let's create a new database and store this chunk in there

  const db = new LevelDB('./db') // Create a DB class
  await db.open() // Open the database
  const world = new WorldProvider(db, { dimension: 0, registry });
  let chunkPositions = [];
  let avers;

  await world.getKeys().then( async u => {
    const onlyChunks = u.filter( k => k.type === 'chunk');

    
    let owl = onlyChunks[0];

    if (owl.key.length > 8 && owl.key.readInt8(8) === 47) {
        // Dump pointers to the subchunk keys
        //console.log(onlyChunks[0]);
        avers = onlyChunks[0];

        fs.writeFileSync('./map/test.json', JSON.stringify((await world.getChunk(avers.x, avers.z, true)).getBlocks(), null, 4), {encoding: 'utf-8'});
        
    }

    //fs.writeFileSync('./map/test.json', JSON.stringify(onlyChunks[0].key, null, 4), {encoding: 'utf-8'});
  });

  await db.close() // Close it
  console.log('Done! 😃')
}

test()