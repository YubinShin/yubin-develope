const express = require("express");
const app = express();
const path = require("path");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

var cors = require("cors");
var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.iggptud.mongodb.net/blog?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
  if (에러) { return console.log(에러) }
  app.listen('8080', function () {
    console.log("listening on 8080");
    db = client.db('blog')
  });
})


app.use(cors());
app.use(express.static(path.join(__dirname, "blog/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());




passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)
    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
});

function 로그인했니(요청, 응답, next) {
  if (요청.user) {
    next()
  }
  else {
    응답.send("로그인 안하셨는데요?")
  }
};

app.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), function (요청, 응답) {
  응답.redirect('/mypage')
})

app.get("/mypage", 로그인했니, function (요청, 응답) {
  console.log(요청.user);
  db.collection('login').find().toArray(function (에러, 결과) {
    응답.json({ 사용자: 요청.user });
  }
  )
});


app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/blog/build/index.html"));
});

app.get("/list", function (요청, 응답) {
  db.collection('post').find().toArray(function (에러, 결과) {
    응답.json({ post: 결과 });
  })
});

app.post("/add", function (요청, 응답) {
  console.log(요청.body);
  db.collection('count').findOne({ name: "게시물갯수" }, function (에러, 결과) {
    var 총게시물갯수 = parseInt(결과.totalPost);
    db.collection('post').insertOne({
      _id: 총게시물갯수 + 1,
      제목: 요청.body.title,
      내용: 요청.body.content,
    }, function (에러, 결과) {
      db.collection('count').updateOne({ name: "게시물갯수" },
        { $inc: { totalPost: 1 } }, function (에러, 결과) {
          if (에러) { return console.log(에러) }
        });
      console.log('저장완료')
      응답.redirect("/post");
    })
  })
});

app.post('/add', function (요청, 응답) {
  응답.send('전송완료');
  db.collection('post').insertOne({ 이름: 'john', _id: 100 }, function (에러, 결과) {
    console.log('저장완료');
    console.log(결과)
  })
})

app.put('/edit', function (요청, 응답) {
  db.collection('post').updateOne(
    { _id: 요청.body.id },
    { $set: { 제목: 요청.body.title, 내용: 요청.body.content } },
    function () {
      console.log('수정완료')
    });
});





/*이 코드는 맨 아래에*/
app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/blog/build/index.html"));
});

