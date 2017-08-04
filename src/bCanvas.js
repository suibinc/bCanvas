import Director from './core/Director';
import ImageShape from './shape/Image';

let director = new Director();
let dom = document.getElementById('demo');
director.bind(dom, 800, 600);

let imageView = new ImageShape(20, 20, 300, 200);
imageView.setRadius(30, 30, 0, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load done', target);
    });
director.addView(imageView);

let imageView2 = new ImageShape(20, 320, 300, 200);
imageView2.setRadius(30, 0, 40, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load done', target);
    });
director.addView(imageView2);

director.start();
