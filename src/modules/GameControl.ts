import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏控制器类
class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性，来存储蛇的移动方向（也就是按键的方向）。
    direction: string = '';

    //创建属性判断游戏是否结束
    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    init(){
        //绑定键盘事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        this.run();
    }

    //键盘事件回调函数
    keydownHandler(e: KeyboardEvent){
        /*
        检查e.key的值是否为上下左右。
        【placeholder】
        */
        
        //修改direction属性
        this.direction = e.key;
    }
    //创建控制蛇移动的方法 run。
    run(){
        //获取x和y值
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
        }
        //检查蛇是否吃到了食物
        this.checkEat(X, Y);

        //try catch 值是否正常
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e: any){
            alert(e.message + "Game Over!");
            this.isLive = false;
        }


        //开启定时器和判断游戏是否结束
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);

    }

    //检查蛇是否吃到食物
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
            //食物要变化
            this.food.change();
            //蛇身体要变化
            this.snake.addBody();
            //分数要变化
            this.scorePanel.addScore();
        }
    }
}

export default GameControl;
