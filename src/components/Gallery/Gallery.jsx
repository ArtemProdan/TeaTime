// import {ImagesArray} from '../../redux/profile_avatars'
import './gallery.css'
//686d0b51-1632-4bae-8685-8230d2986c49:36297877-65da-490a-86bf-c4aea1890948

// import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://api.browse.ai/v2/robots',
//   headers: {
//     Authorization: 'Bearer 686d0b51-1632-4bae-8685-8230d2986c49:36297877-65da-490a-86bf-c4aea1890948'
//   }
// };

// axios.request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

let PornImages = [
    {
      "id": 1,
      "url": "https://i0.wp.com/bigbucks.com.ua/wp-content/uploads/2021/03/seon-hwang.jpg?resize=768%2C960&ssl=1"
    },
    {
      "id": 2,
      "url": "http://24planet-porno.net/uploads/images/00/005/769/5769/thumbs/111164_05.jpg"
    },
    {
      "id": 3,
      "url": "http://24planet-porno.net/uploads/images/00/005/769/5769/original/111164_05.jpg"
    },
   
  ]
   


// let key = 0

const GalleryItem = (props) => {
    return (
        <div className="gal__item">
            <img src={props.src} alt='' key={props.id} />
        </div>
    )
}

// let GalleryList = ImagesArray.map(img => <GalleryItem src={img} key={++key} />)
let GalleryList = PornImages.map(img => <GalleryItem src={img.url} id={img.id} key={img.id}/>)

export const Gallery = () => {
    return (
        <div className="gallery">
            <div className="gallery__wrapper">
                {GalleryList}
            </div>
        </div>
    )
}