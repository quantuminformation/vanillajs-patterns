const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080;

// Static middleware for serving JavaScript, CSS files etc.
app.use(express.static(path.join(__dirname, '.')));

app.get('*', (req, res, next) => {
    // If the request is not for an HTML page, continue with other routes
    if (path.extname(req.path) !== '.html') {
        return next();
    }

    let filePath;

    if (!req.query.newRoute) {
        filePath = path.join(__dirname, 'index.html');
    } else {
        if (req.path.startsWith('/')) {
            filePath = path.join(__dirname, 'pages', req.path.slice(1) + '.html');
        } else {
            filePath = path.join(__dirname, 'pages', req.path + '.html');
        }
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File doesn't exist. Serving index.html instead.`);
            filePath = path.join(__dirname, 'index.html');
        }
        res.sendFile(filePath);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
