function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const http = require("http");
const fs = require("fs");
const path = require("path");

const contentTypes = {
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",

  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}


const group = ['12345', '44445', '56789', '34534', '35641'];
const email = ['aaaa', 'bbbbb', 'dddd', 'ffffff', 'hhhhh'];


webApp = http.createServer(function (request, response) {
  console.log(`Url: ${request.url}`);

  switch (request.url) {
    case "/":
      response.writeHead(301, {
        Location: "/index.html",
        "Content-Type": "text/html; charset=utf-8",
      });
      response.end();
      break;
      case "/rand_student":
        fs.readFile(
          path.join(__dirname, "./templates/generation.html"),
          "utf8",
          (err, template) => {    
            if (err) {            
              response.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8",
              });
              response.end("-серв");
            } else {
              const user = {};
              function getRandomUser(a) {
                
                a.group = `${group[getRandomInt(0, 4)]}`;
                a.almz = getRandomInt(0, 999);
                a.coin = getRandomInt(0, 300);
                a.mes = getRandomInt(0, 10);
                a.med = getRandomInt(0, 100)
                a.avg_grade = getRandomInt(50, 100) / 10;
                a.visit = getRandomInt(30, 100);
                a.age = getRandomInt(10, 35);
                a.email = `${email[getRandomInt(0,4)]}`;
                a.number = `${getRandomInt(1e6, 1e7)}`;
                a.passw = Math.random().toString(36).slice(-8);
                return a;
              } 
              getRandomUser(user);
              const renderHtml =  `
              <div class="block">
		<div class="header">
				<img src="img/prof.png" class="img-up">
				<div class="name">
					<h1>Бибкин Вася Владимирович</h1>
				</div>
		</div>
		<div class="main">
			<div class="group">Group: П${user.group}</div>
			<div class="main-alm">
				<div class="pokaz">
					<img src="img/almz.jpeg" class="main-img">
					<div class="text-img">${user.almz}</div>
					
				</div>
				<div class="pokaz">
					<img src="img/mon.png" class="main-img">
					<div class="text-img">${user.coin}</div>
					
				</div>
				<div class="pokaz">
					<img src="img/Mail.png" class="main-img">
					<div class="text-img">${user.mes}</div>
					
				</div>
				<div class="pokaz">
					<img src="img/med.webp" class="main-img">
					<div class="text-img">${user.med}</div>
					
				</div>
			</div>
			<div class="avg-grade">
				<div class="grade">${user.avg_grade}</div>
				<div class="text-grade">Average Grade</div>
			</div>
			<div class="avg-grade">
				<div class="grade">${user.visit}</div>
				<div class="text-grade">Visit %</div>
			</div>
			<div class="stand-div">AGE: ${user.age}</div>
			<div class="stand-div">email: ${user.email}@gmail.com</div>
			<div class="stand-div">number: 37529${user.number}</div>
			<div class="stand-div">password: ${user.passw}</div>
			
		</div>
		<div class="footer">Last seen in MyStat: 06/30/23</div>
	</div>`;
              const randCard = template.replace("{{content}}", renderHtml);
             

          
           response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          }); 
          response.end(randCard);
          console.log('1');
        }
      }
    );
      break;

    default:
      const filePath = path.join("./public", request.url.substring(1));
      console.log(filePath);

      fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
          console.log(err);
          response.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8",
          });

          response.end("<h1>Not found</h1>");
        } else {
          const extname = path.extname(filePath);
          const contentType =
            contentTypes[extname] || "application/octet-stream";

          response.writeHead(200, {
            "Content-Type": contentType,
          });
          fs.createReadStream(filePath).pipe(response);
        }
      });
  }
});
const port = 2008;
webApp.listen(port, function () {
  console.log(`start 127.0.0.1:${port}`);
});
