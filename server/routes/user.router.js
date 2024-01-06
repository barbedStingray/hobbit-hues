const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});














// ** GET /paints dropdown menu
router.get('/paints', (req, res) => {
  // console.log(`in server route for /paints`);

  const queryText = 'SELECT * FROM "paints" ORDER BY "paint" ASC;';
  pool.query(queryText).then((result) => {
    // console.log(`/paints query success!`);
    res.send(result.rows);
  }).catch((error) => {
    // console.log(`error completing /paints query`);
    res.sendStatus(500);
  });
});

// ** GET /techniques dropdown menu
router.get('/techniques', (req, res) => {
  // console.log(`in server route for /paints`);

  const queryText = 'SELECT * FROM "techniques";';
  pool.query(queryText).then((result) => {
    // console.log(`/paints query success!`);
    res.send(result.rows);
  }).catch((error) => {
    // console.log(`error completing /paints query`);
    res.sendStatus(500);
  });
});


// ** GET /projects request
router.get('/projects', (req, res) => {
  console.log(`in server route for /projects`);
  // console.log(`user_id`, req.params.id);
  console.log(`user_id`, req.user.id);


  const queryText = `SELECT * FROM "projects" WHERE "user_id" = $1 ORDER BY "model" ASC;`;

  pool.query(queryText, [req.user.id]).then((result) => {
    console.log(`success in GET /projects`);
    res.send(result.rows);
  }).catch((error) => {
    console.log(`error in generating your projects list`);
    res.sendStatus(500);
  })
});


// ** GET /details/:id request
router.get('/details/:id', (req, res) => {
  console.log(`in server route for /details/:id`);
  console.log(`general details req.params.id:`, req.params.id);
  console.log(`general details req.user.id:`, req.user.id);

  const queryText = `SELECT * FROM "projects" where "id" = $1;`;

  pool.query(queryText, [req.params.id]).then((result) => {
    console.log(`success in getting details!`);
    res.send(result.rows.length > 0 ? result.rows[0] : {});
  }).catch((error) => {
    console.log(`error in /details/:id`);
    res.sendStatus(500);
  });
});

// ** GET /detailPaints/:id request
router.get('/detailPaints/:id', (req, res) => {
  console.log(`in server route for /detailPaints/:id`);
  console.log(`detail paints req.params.id:`, req.params.id);
  console.log(`detail paints req.user.id:`, req.user.id);

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
    console.log(`success in getting paint details!`);
    res.send(result.rows);
  }).catch((error) => {
    console.log(`error in /details/:id`);
    res.sendStatus(500);
  });
});















// ** POST /newProject request (/api/user/newProject)
router.post('/newProject', (req, res) => {
  console.log(`in userRouter post /newProject req.body`, req.body);
  // console.log(`in userRouter req.body`, req.body.model);
  // console.log(`in userRouter req.body`, req.body.primary);
  // console.log(`in userRouter req.body`, req.body.description);
  // console.log(`in userRouter req.body`, req.body.picture);

  let queryText = `INSERT INTO "projects" 
                  ("user_id", 
                  "model", 
                  "primary", 
                  "description", 
                  "picture")
  VALUES
  ($1, $2, $3, $4, $5);`;


  pool.query(queryText,
    [req.body.user_id, req.body.model, req.body.primary, req.body.description, req.body.picture
    ]).then(result => {
      console.log(`success in POST /newProject`);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`error in POST /newProject`);
      res.sendStatus(500);
    });
});

// ** POST request for (/api/user/newPaint)
router.post('/newPaint', (req, res) => {
  console.log(`in userRouter POST /newPaint req.body`, req.body);
  console.log(`project_id`, req.body.project_id);
  console.log(`paint_id`, req.body.paint_id);
  console.log(`technique_id`, req.body.technique_id);
  console.log(`photo`, req.body.photo);

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
      console.log(`success in POST /newPaint`);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`error in POST /newPaint`);
      res.sendStatus(500);
    });
});









// ** DELETE request /api/user/projectDelete/:id
router.delete(`/projectDelete/:id`, (req, res) => {
  console.log(`in server route for /projectDelete/:id`);
  console.log(`req.params`, req.params.id);
  // console.log(`user_id`, req.user.id);


  const queryText = `DELETE FROM "projects_paints"
                    WHERE "project_id" = $1
                    ;`;

  pool.query(queryText, [req.params.id]).then((result) => {
    console.log(`success in paint DELETE /projectDelete/:id`);

    const qText = `DELETE FROM "projects"
    WHERE "id" = $1
    ;`;

    pool.query(qText, [req.params.id]).then((result) => {
      console.log(`success in project DELETE /projectDelete/:id`);

      res.sendStatus(201);
    }).catch((error) => {
      console.log(`error in deleting your project after paints`);
      res.sendStatus(500);
    });
  }).catch((error) => {
    console.log(`error in deleting your paints before project`);
    res.sendStatus(500);
  })
});

// ** DELETE request /api/user/paintDelete/:id
router.delete(`/paintDelete/:id`, (req, res) => {
  console.log(`in server side for /paintDelete/:id`);
  console.log(`req.params.id`, req.params.id);

  const queryText = `DELETE FROM "projects_paints"
                    WHERE "id" = $1;`;

  pool.query(queryText, [req.params.id]).then((result) => {
    console.log(`success in single paint delete /paintDelete/:id`);
    res.sendStatus(201);
  }).catch((error) => {
    console.log(`error in deleting your single paint`);
    res.sendStatus(500);
  });
});










// ** PUT request /api/user/editProject/:id
router.put(`/editProject/:id`, (req, res) => {
  console.log(`in server side for /editProject/:id`);
  console.log(`req.params.id`, req.params.id);
  console.log(`req.body`, req.body);

  const queryText = `UPDATE "projects" 
                    SET "description" = $1, "picture" = $2
                    WHERE "id" = $3
                    ;`;

  pool.query(queryText,
    [req.body.description,
    req.body.picture,
    req.params.id]).then((result) => {
      console.log(`success! in PUT project details!`);
      res.sendStatus(201);
    }).catch((error) => {
      console.log(`error in PUT project details`);
      res.sendStatus(500);
    });
});








module.exports = router;
