import bCanvas from '../../src/bCanvas';
import ImageShape from '../../src/shape/Image';

let dom = document.getElementById('demo');
let director = bCanvas.bind(dom, 800, 600);

let imageView1 = new ImageShape(20, 20, 300, 200);
imageView1.setRadius(30, 30, 0, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load image1 done', target);
    });
imageView1.$click(e => {
    console.log('click image1');
});
director.addView(imageView1);

let imageView2 = new ImageShape(20, 320, 300, 200);
imageView2.setRadius(30, 0, 40, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load image2 done', target);
    });
imageView2.$click(e => {
    console.log('click image2');
});
director.addView(imageView2);

director.start();
