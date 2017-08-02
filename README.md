# bCanvas
canvas tools

### 如何使用？

 1. import
 ```javascript
 import Director from './core/Director';
 import ImageShape from './shape/Image';
 ```
 2. create view and add view
 ```javascript
 let imageView = new ImageShape(20, 20, 300, 200);
imageView.setRadius(30, 30, 0, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load done', target);
    });
director.addView(imageView);

let imageView2 = new ImageShape(20, 320, 300, 200);
imageView2.setRadius(30, 30, 0, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load done', target);
    });
director.addView(imageView2);
 ```
 3. start
 ```javascript
 director.start();
 ```
