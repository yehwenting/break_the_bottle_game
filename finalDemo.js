$(document).ready(()=>{ // jQuery main
    let stage = new createjs.Stage(canvas);
    let repo = new createjs.LoadQueue();
    let bottles = new Array(120);
    let bottles_b = new Array(120);
    let people = new Array(15);
    let hearts = new Array(5);
    let score = 0;
    let flag = true;
    let bottle_broken=false;
    let broken = "broken";
    let start = "start";
    let wrong = "wrong";

    function setup() {
        // automatically update
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSound("sounds/broken.mp3", broken);
        createjs.Sound.registerSound("sounds/start.mp3", start);
        createjs.Sound.registerSound("sounds/wrong.mp3", wrong);

        createjs.Ticker.on("tick", e => stage.update());
        createjs.Ticker.framerate = 60;
        // load assets
        repo.loadManifest([{id:'bg',src:"images/bg_game.png"}]);
        repo.loadManifest([{id:'longbelt',src:"images/longbelt.png"}]);
        repo.loadManifest([{id:'target',src:"images/target.png"}]);
        repo.loadManifest([{id:'tooth',src:"images/tooth.png"}]);
        repo.loadManifest([{id:'longtooth',src:"images/longtooth.png"}]);
        repo.loadManifest([{id:'wheel',src:"images/wheel.png"}]);
        repo.loadManifest([{id:'bottle0',src:"images/bottle0.png"}]);
        repo.loadManifest([{id:'bottle1',src:"images/bottle1.png"}]);
        repo.loadManifest([{id:'bottle2',src:"images/bottle2.png"}]);
        repo.loadManifest([{id:'bottle3',src:"images/bottle3.png"}]);
        repo.loadManifest([{id:'bottle4',src:"images/bottle4.png"}]);
        repo.loadManifest([{id:'p1',src:"images/p1.png"}]);
        repo.loadManifest([{id:'p2',src:"images/p2.png"}]);
        repo.loadManifest([{id:'p3',src:"images/p3.png"}]);
        repo.loadManifest([{id:'p4',src:"images/p4.png"}]);
        repo.loadManifest([{id:'p5',src:"images/p5.png"}]);
        repo.loadManifest([{id:'fish',src:"images/fish.png"}]);
        repo.loadManifest([{id:'bottle0_b',src:"images/jar_broken_blue.png"}]);
        repo.loadManifest([{id:'bottle1_b',src:"images/jar_broken_yellow.png"}]);
        repo.loadManifest([{id:'bottle2_b',src:"images/jar_broken_pink.png"}]);
        repo.loadManifest([{id:'bottle3_b',src:"images/jar_broken_red.png"}]);
        repo.loadManifest([{id:'bottle4_b',src:"images/jar_broken_green.png"}]);
        repo.loadManifest([{id:'bg1',src:"images/bg_front_page.png"}]);
        repo.loadManifest([{id:'bg2',src:"images/bg_story_1.png"}]);
        repo.loadManifest([{id:'bg3',src:"images/bg_story_2.png"}]);
        repo.loadManifest([{id:'bg4',src:"images/bg_how_to_play_1.png"}]);
        repo.loadManifest([{id:'bg5',src:"images/bg_how_to_play_2.png"}]);
        repo.loadManifest([{id:'bg6',src:"images/bg_how_to_play_3.png"}]);
        repo.loadManifest([{id:'bg7',src:"images/bg_how_to_play_4.png"}]);
        repo.loadManifest([{id:'bg8',src:"images/bg_how_to_play_5.png"}]);
        repo.loadManifest([{id:'bg9',src:"images/bg_test.png"}]);
        repo.loadManifest([{id:'win',src:"images/bg_win.png"}]);
        repo.loadManifest([{id:'lose',src:"images/bg_lose.png"}]);
        repo.loadManifest([{id:'heart',src:"images/heart.png"}]);
        repo.loadManifest([{id: 'pipe', src:"images/pipe.png"}]);
        repo.loadManifest([{id:'start1',src:"images/game_start_title_unclicked.png"}]);
        repo.loadManifest([{id:'start2',src:"images/game_start_title_clicked.png"}]);
        repo.loadManifest([{id:'click_next',src:"images/click_start.png"}]);
        repo.loadManifest([{id:'click_start',src:"images/click_then_start.png"}]);
        repo.loadManifest([{id:'test_pipe',src:"images/test_pipe.png"}]);
        repo.loadManifest([{id:'back_game1',src:"images/game_win_title_unclicked.png"}]);
        repo.loadManifest([{id:'back_game2',src:"images/game_win_title_clicked.png"}]);
        repo.loadManifest([{id:'alert',src:"images/alert.png"}]);
        repo.loadManifest([{id:'teacher',src:"images/teacher.png"}]);
        repo.on('complete', draw);
    }
    function draw(){
        let bg1 = new createjs.Bitmap(repo.getResult('bg1'));
        let bg2 = new createjs.Bitmap(repo.getResult('bg2'));
        let bg3 = new createjs.Bitmap(repo.getResult('bg3'));
        let bg4 = new createjs.Bitmap(repo.getResult('bg4'));
        let bg5 = new createjs.Bitmap(repo.getResult('bg5'));
        let bg6 = new createjs.Bitmap(repo.getResult('bg6'));
        let bg7 = new createjs.Bitmap(repo.getResult('bg7'));
        let bg8 = new createjs.Bitmap(repo.getResult('bg8'));
        let bg9 = new createjs.Bitmap(repo.getResult('bg9'));
        let start1 = new createjs.Bitmap(repo.getResult('start1'));
        let start2  = new createjs.Bitmap(repo.getResult('start2'));
        let click_next = new createjs.Bitmap(repo.getResult('click_next'));
        let click_start = new createjs.Bitmap(repo.getResult('click_start'));
        let test_pipe = new createjs.Bitmap(repo.getResult('test_pipe'));
        let back_game1 = new createjs.Bitmap(repo.getResult('back_game1'));
        let back_game2 = new createjs.Bitmap(repo.getResult('back_game2'));
        let win = new createjs.Bitmap(repo.getResult('win'));
        let lose = new createjs.Bitmap(repo.getResult('lose'));
        let bottle0_b = new createjs.Bitmap(repo.getResult('bottle0_b'));
        let bottle1_b = new createjs.Bitmap(repo.getResult('bottle1_b'));
        let bottle2_b = new createjs.Bitmap(repo.getResult('bottle2_b'));
        let bottle3_b = new createjs.Bitmap(repo.getResult('bottle3_b'));
        let bottle4_b = new createjs.Bitmap(repo.getResult('bottle4_b'));
        let bottle0 = new createjs.Bitmap(repo.getResult('bottle0'));
        let bottle1 = new createjs.Bitmap(repo.getResult('bottle1'));
        let bottle2 = new createjs.Bitmap(repo.getResult('bottle2'));
        let bottle3 = new createjs.Bitmap(repo.getResult('bottle3'));
        let bottle4 = new createjs.Bitmap(repo.getResult('bottle4'));
        let p1 = new createjs.Bitmap(repo.getResult('p1'));
        let p2 = new createjs.Bitmap(repo.getResult('p2'));
        let p3 = new createjs.Bitmap(repo.getResult('p3'));
        let p4 = new createjs.Bitmap(repo.getResult('p4'));
        let p5 = new createjs.Bitmap(repo.getResult('p5'));
        let fish = new createjs.Bitmap(repo.getResult('fish'));
        let heart = new createjs.Bitmap(repo.getResult('heart'));
        let pipe = new createjs.Bitmap(repo.getResult('pipe'));
        let alert = new createjs.Bitmap(repo.getResult('alert'));
        let teacher = new createjs.Bitmap(repo.getResult('teacher'));
        let num = 4;
        let score_init_text = new createjs.Text("score: 0", "25px Source Code Pro", "black");

        home();
        function home() {
            back_game1.removeAllEventListeners();

            //home
            stage.addChild(bg1);
            stage.addChild(start1);
            start1.set({x: 345, y: 535});
            start2.set({x: 345, y: 535});
            // hover
            stage.enableMouseOver(50); //frequency per second
            start1.addEventListener("mouseover", function () {
                stage.addChild(start2);
            });
            start1.addEventListener("mouseout", function () {
                stage.addChild(start1);
            });
            start1.addEventListener("click", function() {
                story1();
            });
        }
        function story1() {
            start1.removeAllEventListeners();
            let instance = createjs.Sound.play(start, {loop:-1});
            instance.volume = 0.1;
            stage.addChild(bg2);
            stage.addChild(teacher);
            teacher.scale = 0.25;
            teacher.set({x: 1100, y: 400});
            createjs.Tween.get(teacher).to({x:-400},5000).to({x:1100},5000);

            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});
            bg2.addEventListener("click", function() {

                story2();
            });
        }
        function story2() {
            bg2.removeAllEventListeners();
            stage.addChild(bg3);
            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});
            bg3.addEventListener("click", function() {
                story3();
            });
        }
        function story3() {
            bg3.removeAllEventListeners();
            stage.addChild(bg4);
            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});
            bg4.addEventListener("click", function() {
                story4();
            });
        }
        function story4() {
            bg4.removeAllEventListeners();
            stage.addChild(bg5);

            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});

            bg5.addEventListener("click", function() {
                story5();
            });
        }
        function story5() {
            bg5.removeAllEventListeners();
            stage.addChild(bg6);
            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});
            bg6.addEventListener("click", function() {
                story6();
            });
        }
        function story6() {
            bg6.removeAllEventListeners();
            stage.addChild(bg7);
            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});
            bg7.addEventListener("click", function() {
                story7();
            });
        }
        function story7() {
            bg7.removeAllEventListeners();
            stage.addChild(bg8);
            stage.addChild(click_next);
            click_next.set({x: 850, y: 700});
            bg8.addEventListener("click", function() {
                story8();
            });
        }
        // test your voice
        function story8() {
            bg8.removeAllEventListeners();
            stage.addChild(bg9);

            stage.addChild(click_start);
            click_start.set({x: 720, y: 700});
            var socket1 = io.connect();
            socket1.on('db', function(data) {
                var bordertest = new createjs.Shape();
                bordertest.graphics.beginStroke("#000");
                bordertest.graphics.beginFill("#FFF");
                bordertest.graphics.setStrokeStyle(1);
                bordertest.snapToPixel = true;
                bordertest.graphics.drawRect(0, 200, (data.db-50)*16, 185);
                stage.addChild(bordertest);
                createjs.Tween.get(bordertest).wait(300).call(()=>stage.removeChild(bordertest));
                console.log(data.db);
                stage.addChild(test_pipe);
                test_pipe.set({x: -70, y: 175});
            });


            bg9.addEventListener("click", function() {
                socket1.disconnect();
                game_start();
            });


        }
        //---------------GAME-----------------
        function game_start(){
            bg9.removeAllEventListeners();
            let bg = new createjs.Bitmap(repo.getResult('bg'));
            stage.addChild(bg);
            let tooth1 = new createjs.Bitmap(repo.getResult('longtooth'));
            tooth1.set({x:0,y:570});
            stage.addChild(tooth1);
            createjs.Tween.get(tooth1,{loop:true}).to({x:-80},1520);
            let tooth2 = new createjs.Bitmap(repo.getResult('longtooth'));
            tooth2.set({x:-30,y:630});
            stage.addChild(tooth2);
            createjs.Tween.get(tooth2,{loop:true}).to({x:50},1520);
            let belt1 = new createjs.Bitmap(repo.getResult('longbelt'));
            belt1.set({x:0,y:327});
            belt1.on("tick",function (e) {
                belt1.x-=((19/361)*1000)/60;
                if(belt1.x<-1330){
                    belt1.x=1140;
                }
            });
            stage.addChild(belt1);
            let belt2 = new createjs.Bitmap(repo.getResult('longbelt'));
            belt2.set({x:1330,y:327});
            belt2.on("tick",function (e) {
                belt2.x-=((19/361)*1000)/60;
                if(belt2.x<-1330){
                    belt2.x=1140;
                }
            });
            stage.addChild(belt2);
            let target = new createjs.Bitmap(repo.getResult('target'));
            target.set({x:14,y:360});
            stage.addChild(target);
            let wheel = new createjs.Bitmap(repo.getResult('wheel'));
            wheel.set({x:0,y:553});
            stage.addChild(wheel);

            var socket = io.connect();
            socket.on('db', function(data) {
                var border = new createjs.Shape();
                border.graphics.beginStroke("#000");
                border.graphics.beginFill("#000");
                border.graphics.setStrokeStyle(1);
                border.snapToPixel = true;
                border.graphics.drawRect(0, 20, (data.db-50)*16, 30);
                stage.addChild(border);
                createjs.Tween.get(border).wait(300).call(()=>stage.removeChild(border));
                console.log(data.db);
                let pipe = new createjs.Bitmap(repo.getResult('pipe'));
                pipe.set({x:0,y:0});
                stage.addChild(pipe);
            });


            score_init_text.x = 880;
            score_init_text.y = 160;
            score_init_text.textBaseline = "alphabetic";
            stage.addChild(score_init_text);
            function bottle(){
                for(let i = 1; i<bottles.length; i++){
                    let bottle;
                    bottles[0] = null;
                    bottles_b[0] = null;
                    bottles[i] = Math.floor(Math.random()*5);
                    bottles_b[i] = bottles[i];
                    console.log(bottles[i]);
                    switch(bottles[i]){
                        case 0: bottle = bottle0.clone(); break;
                        case 1: bottle = bottle1.clone(); break;
                        case 2: bottle = bottle2.clone(); break;
                        case 3: bottle = bottle3.clone(); break;
                        case 4: bottle = bottle4.clone(); break;
                    }
                    switch(bottles_b[i]){
                        case 0: bottles_b[i] = bottle0_b.clone(); break;
                        case 1: bottles_b[i] = bottle1_b.clone(); break;
                        case 2: bottles_b[i] = bottle2_b.clone(); break;
                        case 3: bottles_b[i] = bottle3_b.clone(); break;
                        case 4: bottles_b[i] = bottle4_b.clone(); break;
                    }
                    bottle.set({x:190*i+7,y:270});
                    bottle.on('tick',function(e){
                        bottle.x-=((19/361)*1000)/60;
                        if(bottle.x>15 && bottle.x<160){
                            socket.on('db', function(data) {
                                if(bottles[i]===0 && data.db>70 && data.db<=80){
                                    bottle_broken=true;
                                    bottles[i]=6;
                                }else if(bottles[i]===1 && data.db>80 && data.db<=90){
                                    bottle_broken=true;
                                    bottles[i]=6;
                                }else if(bottles[i]===2 && data.db>90 && data.db<=100){
                                    bottle_broken=true;
                                    bottles[i]=6;
                                }else if(bottles[i]===3 && data.db>100 && data.db<=110){
                                    bottle_broken=true;
                                    bottles[i]=6;
                                }else if(bottles[i]===4 && data.db>110 ){
                                    bottle_broken=true;
                                    bottles[i]=6;
                                }
                                if(bottle_broken) {
                                    createjs.Sound.play(broken);
                                    createjs.Tween.get(bottle).call(() => {
                                        stage.removeChild(bottle);
                                        bottles_b[i].set({x: bottle.x, y: 270});
                                        bottles_b[i].x -= ((19 / 361) * 1000) / 1100;
                                        stage.addChild(bottles_b[i]);
                                        if (flag === true) {
                                            if (people[i] != 5){
                                                score_view();
                                                flag = false;
                                                console.log(score);
                                            }else{
                                                alert.set({x: bottle.x, y: 270});
                                                alert.x -= ((19 / 361) * 1000) / 1100;
                                                stage.addChild(alert);
                                            }
                                        }
                                    }).wait(300).call(() => {stage.removeChild(bottles_b[i]);
                                    stage.removeChild(alert)});
                                    flag = true;
                                    if (people[i] === 5){
                                            stage.removeChild(hearts[num]);
                                            num --;
                                            createjs.Sound.play(wrong);
                                        if (num <= -1){
                                            socket.disconnect();
                                            game_lose();
                                        }
                                    }
                                    bottle_broken=false;
                                }
                            });

                        }
                        if( bottle.x < -156 && bottle.x > -157 ){
                            if(people[i] != 5){
                                console.log(people[i]);
                                stage.removeChild(hearts[num]);
                                num --;
                                //console.log(num);

                                if (num <= -1){
                                    socket.disconnect();
                                    game_lose();
                                }
                            }
                        }
                        if(bottle.x<-190){
                            stage.removeChild(bottle);
                        }
                    });
                    stage.addChild(bottle);
                }
            }
            heart1();
            people1();
            bottle();
            function score_view() {
                score += 5;
                let score_text = new createjs.Text("score: " + score, "25px Source Code Pro", "black");
                let rect = new createjs.Shape();
                rect.graphics.beginFill('#F9F7F3').drawRect(880, 120, 200, 50);
                stage.addChild(rect);
                score_text.x = 880;
                score_text.y = 160;
                score_text.textBaseline = "alphabetic";
                stage.addChild(score_text);
                if (score === 50){
                    socket.disconnect();
                    game_win();
                }
            }
            function people1() {
                for(let i = 1; i<people.length; i++){
                    let person;
                    people[0] = null;
                    people[i] = Math.floor(Math.random()*6);
                    //console.log(people[i]);
                    switch(people[i]){
                        case 0:  person = p1.clone(); break;
                        case 1:  person = p2.clone(); break;
                        case 2:  person = p3.clone(); break;
                        case 3:  person = p4.clone(); break;
                        case 4:  person = p5.clone(); break;
                        case 5:  person = fish.clone(); break;
                    }
                    person.set({x:190*i+35,y:310});
                    person.scale=0.7;
                    person.on('tick',function(e){
                        person.x-=((19/361)*1000)/60;
                        if(person.x<-190){
                            person.x=2470;
                        }
                    });
                    stage.addChild(person);
                }
            }
            function heart1() {
                for (let i = 0; i < hearts.length; i++){
                    hearts[i] = heart.clone();
                    hearts[i].set({x:50*i+25, y:90});
                    hearts[i].scale = 0.7;
                    stage.addChild(hearts[i]);
                }
            }
        }
        function game_lose(){
            stage.addChild(lose);
            stage.addChild(back_game1);
            back_game1.set({x: 345, y: 584});
            back_game2.set({x: 345, y: 584});
            // hover
            stage.enableMouseOver(50); //frequency per second
            back_game1.addEventListener("mouseover", function () {
                stage.addChild(back_game2);
            });
            back_game1.addEventListener("mouseout", function () {
                stage.addChild(back_game1);
            });
            back_game1.addEventListener("click", function() {
                location.reload();
            });
        }
        function game_win(){
            stage.addChild(win);
            stage.addChild(back_game1);
            back_game1.set({x: 345, y: 584});
            back_game2.set({x: 345, y: 584});
            // hover
            stage.enableMouseOver(50); //frequency per second
            back_game1.addEventListener("mouseover", function () {
                stage.addChild(back_game2);
            });
            back_game1.addEventListener("mouseout", function () {
                stage.addChild(back_game1);
            });
            back_game1.addEventListener("click", function() {
                location.reload();
            });
        }
    }
    setup();
});