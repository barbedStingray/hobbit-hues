const express = require('express')
const pool = require('../modules/pool')
const router = express.Router()


// NEW 

// GET request /api/user/realms
router.get('/themes', (req, res) => {
  const queryText = 'SELECT * FROM "themes"'
  pool.query(queryText).then((result) => {
    console.log(`/realms query success!`)
    res.send(result.rows)
  }).catch((error) => {
    console.log(`error in completing /realms query`)
    res.sendStatus(500)
  })
})

// POST /newMini request (/api/user/newMini)
router.post('/newMini', async (req, res) => {
  const { model, world, paint_quality, date, picture } = req.body.newMini
  const theRealms = req.body.realms

  const miniQuery = `
  INSERT INTO "minis" ("model", "world", "paint_quality", "date", "picture")
  VALUES ($1, $2, $3, $4, $5) RETURNING id;`

  const realmQuery = `
  INSERT INTO "mini_themes" ("mini_id", "theme_id")
  VALUES ($1, $2);`

  try {
    const result = await pool.query(miniQuery, [model, world, paint_quality, date, picture])
    const newMiniId = result.rows[0].id

    if (theRealms.length > 0) {
      const realmInsertPromises = theRealms.map(realmId => {
        return pool.query(realmQuery, [newMiniId, realmId])
      });
      await Promise.all(realmInsertPromises)
    }
    res.sendStatus(201)

  } catch (error) {
    console.log('Error in newMini route:', error)
    res.sendStatus(500)
  }
})

// POST new realm
router.post('/newRealm', (req, res) => {
  const { world, realm } = req.body
  console.log(world, realm)

  const queryText = `INSERT INTO "themes" ("world", "realm") VALUES ($1, $2)`

  pool.query(queryText, [world, realm]).then(result => {
    console.log('successs in post new realm')
    res.sendStatus(201)
  }).catch(error => {
    console.log('error in realms posting')
    res.sendStatus(500)
  })
})

// DELETE REALM
router.delete('/deleteRealm/:id', (req, res) => {
  const queryText = `DELETE FROM "themes" WHERE "id" = $1`
  pool.query(queryText, [req.params.id]).then((result) => {
    res.sendStatus(201)
    console.log('success')
  }).catch((error) => {
    res.sendStatus(500)
    console.log('error')
  })
})








router.get('/allMinis', (req, res) => {
  const { realms, paint_quality } = req.query

  const paintQualityArray = paint_quality ? paint_quality.map(Number) : []
  const realmsArray = realms ? realms : []

  let queryText = `
    SELECT 
      m.*, 
      ARRAY_AGG(t.realm) AS realms
    FROM "minis" m
    LEFT JOIN "mini_themes" mt ON m.id = mt.mini_id
    LEFT JOIN "themes" t ON mt.theme_id = t.id
    GROUP BY m.id
  `

  const queryParams = []

  if (realmsArray.length > 0 && paintQualityArray.length > 0) {
    // Case 1: Both realms and paint_quality have values
    queryText += `
      HAVING 
        EXISTS (
          SELECT 1
          FROM unnest($1::text[]) AS selected_realm 
          WHERE selected_realm = ANY(ARRAY_AGG(t.realm))
        )
        AND m.paint_quality = ANY($2::int[])
    `
    queryParams.push(realmsArray, paintQualityArray)
    
  } else if (realmsArray.length > 0) {
    // Case 3: Only realms have values, filter by realms
    queryText += `
      HAVING 
        EXISTS (
          SELECT 1
          FROM unnest($1::text[]) AS selected_realm 
          WHERE selected_realm = ANY(ARRAY_AGG(t.realm))
        )
    `
    queryParams.push(realmsArray)

  } else if (paintQualityArray.length > 0) {
    // Only paint_quality has values, filter by paint_quality
    queryText += `HAVING m.paint_quality = ANY($1::int[])`
    queryParams.push(paintQualityArray)
  }

  queryText += ` ORDER BY m.paint_quality DESC, RANDOM()`

  console.log('Query Text:', queryText)
  console.log('Query Params:', queryParams)

  pool.query(queryText, queryParams)
    .then((result) => {
      console.log('results', result.rows)
      res.send(result.rows)
    })
    .catch((error) => {
      console.error('Query error', error)
      res.sendStatus(500)
    })
})





// END NEW 







const queryText = `
SELECT 
  m.*, 
  ARRAY_AGG(t.realm) AS realms
FROM "minis" m
LEFT JOIN "mini_themes" mt ON m.id = mt.mini_id
LEFT JOIN "themes" t ON mt.theme_id = t.id
GROUP BY m.id
HAVING 
  EXISTS (
    SELECT 1
    FROM unnest($1::text[]) AS selected_realm 
    WHERE selected_realm = ANY(ARRAY_AGG(t.realm))
  )
  AND m.paint_quality = ANY($2::int[])`


  // This is the start of something new, feels so right, to be here with youuuuu










































































// *** ALL GET REQUESTS

// GET /paints dropdown menu
router.get('/paints', (req, res) => {
  const queryText = 'SELECT * FROM "paints" ORDER BY "paint" ASC;';
  pool.query(queryText).then((result) => {
    // console.log(`/paints query success!`);
    res.send(result.rows);
  }).catch((error) => {
    // console.log(`error in completing /paints query`);
    res.sendStatus(500);
  });
});

// GET /techniques dropdown menu
router.get('/techniques', (req, res) => {
  const queryText = 'SELECT * FROM "techniques";';
  pool.query(queryText).then((result) => {
    // console.log(`/paints query success!`);
    res.send(result.rows);
  }).catch((error) => {
    // console.log(`error completing /paints query`);
    res.sendStatus(500);
  });
});

// GET /projects request
router.get('/projects', (req, res) => {
  const queryText = `SELECT * FROM "projects" WHERE "user_id" = $1 ORDER BY "model" ASC;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    // console.log(`success in GET /projects`);
    res.send(result.rows);
  }).catch((error) => {
    // console.log(`error in generating your projects list`);
    res.sendStatus(500);
  })
});

// GET /details/:id request
router.get('/details/:id', (req, res) => {
  const queryText = `SELECT * FROM "projects" where "id" = $1;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    // console.log(`success in getting details!`);
    res.send(result.rows.length > 0 ? result.rows[0] : {});
  }).catch((error) => {
    // console.log(`error in /details/:id`);
    res.sendStatus(500);
  });
});

// GET /detailPaints/:id request
router.get('/detailPaints/:id', (req, res) => {
  const queryText = `SELECT 
	"projects_paints"."id",
	"projects_paints"."photo",
  "projects_paints"."notes",
	"paints"."paint",
	"paints"."hexcode",
	"techniques"."technique"

FROM "projects_paints" 
JOIN "paints" ON "paints"."id" = "projects_paints"."paint_id"
JOIN "techniques" ON "techniques"."id" = "projects_paints"."technique_id"

WHERE "projects_paints"."project_id" = $1
ORDER BY "projects_paints"."id" DESC
;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    // console.log(`success in getting paint details!`);
    res.send(result.rows);
  }).catch((error) => {
    // console.log(`error in /details/:id`);
    res.sendStatus(500);
  });
});

// GET /community request (/api/user/community)
router.get('/community', (req, res) => {
  const queryText = `SELECT 
	"projects"."id",
	"projects"."description",
	"projects"."model",
	"projects"."picture",
	"projects"."primary",
	"user"."username"
FROM "projects" 
JOIN "user" ON "user"."id" = "projects"."user_id"
WHERE "public" = TRUE
ORDER BY RANDOM() LIMIT 25
;`;
  pool.query(queryText).then((result) => {
    console.log(`success in GET /projects`);
    res.send(result.rows);
  }).catch((error) => {
    console.log(`error in generating community projects list`);
    res.sendStatus(500);
  })
});



// *** ALL POST REQUESTS


// POST request for a new paint (/api/user/newPaint)
router.post('/newPaint', (req, res) => {
  let queryText = `INSERT INTO "projects_paints" 
                  ("project_id", 
                  "paint_id", 
                  "technique_id", 
                  "photo",
                  "notes")
  VALUES
  ($1, $2, $3, $4, $5);`;
  pool.query(queryText,
    [req.body.project_id, req.body.paint_id, req.body.technique_id, req.body.photo, req.body.notes
    ]).then(result => {
      // console.log(`success in POST /newPaint`);
      res.sendStatus(201);
    }).catch((error) => {
      // console.log(`error in POST /newPaint`);
      res.sendStatus(500);
    });
});

// *** ALL POST REQUESTS






// *** ALL DELETE REQUESTS

// DELETE request for entire project /api/user/projectDelete/:id
router.delete(`/projectDelete/:id`, (req, res) => {
  const queryText = `DELETE FROM "projects_paints"
                    WHERE "project_id" = $1
                    ;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    // console.log(`success in paint DELETE /projectDelete/:id`);
    const qText = `DELETE FROM "projects"
    WHERE "id" = $1
    ;`;
    pool.query(qText, [req.params.id]).then((result) => {
      // console.log(`success in project DELETE /projectDelete/:id`);
      res.sendStatus(201);
    }).catch((error) => {
      // console.log(`error in deleting your project after paints`);
      res.sendStatus(500);
    });
  }).catch((error) => {
    // console.log(`error in deleting your paints before project`);
    res.sendStatus(500);
  })
});

// DELETE request /api/user/paintDelete/:id
router.delete(`/paintDelete/:id`, (req, res) => {
  const queryText = `DELETE FROM "projects_paints"
                    WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    // console.log(`success in single paint delete /paintDelete/:id`);
    res.sendStatus(201);
  }).catch((error) => {
    // console.log(`error in deleting your single paint`);
    res.sendStatus(500);
  });
});

// *** ALL DELETE REQUESTS








// *** ALL PUT REQUESTS

// PUT request to change project details (/api/user/editProject/:id)
router.put(`/editProject/:id`, (req, res) => {
  const queryText = `UPDATE "projects" 
                    SET "description" = $1, "picture" = $2
                    WHERE "id" = $3
                    ;`;
  pool.query(queryText,
    [req.body.description,
    req.body.picture,
    req.params.id]).then((result) => {
      // console.log(`success! in PUT project details!`);
      res.sendStatus(201);
    }).catch((error) => {
      // console.log(`error in PUT project details`);
      res.sendStatus(500);
    });
});

// PUT to make project public
router.put(`/publicprivate/:id`, (req, res) => {

  console.log(`reqparams`, req.params.id);
  const queryText = `UPDATE "projects"
                      SET "public" = NOT public
                      WHERE "id" = $1;`;
  pool.query(queryText,
    [req.params.id]).then((result) => {
      console.log(`success! in PUT public private!`);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`error in PUT public private`);
      res.sendStatus(500);
    });
});



module.exports = router;
