# bCanvas
canvas tools

### 简单的使用

 1. import
 ```javascript
 import Director from './core/Director';
 import ImageShape from './shape/Image';
 ```
 2. create view and add view
 ```javascript
let imageView1 = new ImageShape(400, 200, 300, 200);
imageView1.setRadius(30, 30, 0, 0) // 圆角
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
    // 图片加载完成后回调
        console.log('load image1 done', target);
    }).animate({ // 动画队列
        duration: 2000,
        from: {
            x: 20,
            y: 20
        },
        to: {
            x: 200,
            y: 200
        }
    }).animate({
        duration: 1500,
        from: {
            x: 200,
            y: 200
        },
        to: {
            x: 400,
            y: 200
        }
    }).$click(e => {
        console.log('click image1'); // 事件
    });
director.addView(imageView1);
 ```
 3. start
 ```javascript
 director.start();
 ```
