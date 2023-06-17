import { Formik, Field, Form } from "formik";
import './gallery.css'

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

let GalleryList = PornImages.map(img => <GalleryItem src={img.url} id={img.id} key={img.id}/>)

export const Gallery = () => {
    return (
        <div className="gallery">
            <div className="gallery__wrapper">
                {GalleryList}
            </div>

            <div>
            <h1>Авторизоваться</h1>
            <Formik
                initialValues={{ password: '', email: "" }}
                onSubmit={async (values) => {
                    
                    alert(JSON.stringify(values));

                }}
            >
                {({ errors, touched}) => (
                    <Form>
                        <Field name="email" type="text" />
                        <Field name="password" type="text" />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
    )
}