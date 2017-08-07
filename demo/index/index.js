import bCanvas from '../../src/bCanvas';
import ImageShape from '../../src/shape/Image';

let dom = document.getElementById('demo');
let director = bCanvas.bind(dom, 800, 600);

let imageView1 = new ImageShape(400, 200, 300, 200);
imageView1.setRadius(30, 30, 0, 0) // 设置各个方向的圆角
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        // 图片加载完成后的回调
        console.log('load image1 done', target);
    })
    .animate({ // 动画队列，animate会在执行完一个动画后再执行下一个动画，支持动画结束回调
        // 动画支持的属性有[x, y, width, height, scale, opacity]
        // 后续将会加入更多属性支持
        duration: 2000, //动画时长
        from: {
            // 开始状态
            x: 20,
            y: 20,
            scale: 0
        },
        to: {
            // 结束状态
            x: 200,
            y: 200,
            scale: 1
        }
    })
    .animate({
        duration: 1500,
        from: {
            x: 200,
            y: 200,
            opacity: 1
        },
        to: {
            x: 400,
            y: 200,
            opacity: 0.2
        }
    })
    .$click(e => {
        console.log('click image1');
    });
director.addView(imageView1);

setTimeout(() => {
    imageView1.animate({
        duration: 1500,
        from: {
            x: 400,
            y: 200,
            opacity: 0.2
        },
        to: {
            x: 400,
            y: 20,
            opacity: 1
        }
    });
}, 6000);

let imageView2 = new ImageShape(20, 320, 300, 200);
imageView2.setRadius(30, 0, 40, 0)
    .load('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3142918916,85696104&fm=173&s=A286D500C092A58C3B990C800300E090&w=640&h=427&img.JPEG')
    .then(target => {
        console.log('load image2 done', target);
    })
    .$click(e => {
        console.log('click image2');
    });
director.addView(imageView2);

director.start();
