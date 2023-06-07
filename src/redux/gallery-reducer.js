import { ImagesArray } from "./profile_avatars"

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_NEW_COMMENT_TEXT = 'UPDATE-NEW-COMMENT-TEXT'

let initialState = [
  {
    link: ImagesArray[0],
    title: "Боб",
    id: 1,
    isLiked: true,
    comments: [
      {
        text: 'Artem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '15/5/2021'
      },
      {
        text: 'Шикарный кот.',
        date: '28/4/2021'
      },
      {
        text: 'Мой проверочный коммент',
        date: 'сегодня'
      }
    ],
    newPostText: ''
  },
  {
    link: ImagesArray[1],
    title: "Мэри",
    id: 2,
    isLiked: true,
    comments: [
      {
        text: 'Отличный снимок!',
        date: '13/4/2021'
      }
    ]
  },
  {
    link: ImagesArray[2],
    title: "Альфред",
    id: 3,
    isLiked: false,
    comments: []
  },

  {
    link: ImagesArray[3],
    title: "Глори",
    id: 4,
    isLiked: true,
    comments: [
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '15/5/2021'
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '15/5/2021'
      },
      {
        text: 'Lorem ipsum dolor sit amet.',
        date: '15/5/2021'
      },
    ]
  },
  {
    link: ImagesArray[4],
    title: "Маша",
    id: 5,
    isLiked: false,
    comments: []
  },
  {
    link: ImagesArray[5],
    title: "Марк",
    id: 6,
    isLiked: false,
    comments: []
  },
  {
    link: ImagesArray[6],
    title: "Алекс",
    id: 7,
    isLiked: true,
    comments: []
  },
  {
    link: ImagesArray[7],
    title: "Элис",
    id: 8,
    isLiked: false,
    comments: []
  },
  {
    link: ImagesArray[8],
    title: "Джо",
    id: 9,
    isLiked: true,
    comments: []
  },
  {
    link: ImagesArray[9],
    title: "Мила",
    id: 10,
    isLiked: true,
    comments: []
  },
  {
    link: ImagesArray[10],
    title: "Джон",
    id: 11,
    isLiked: false,
    comments: []
  },
  {
    link: ImagesArray[11],
    title: "Кыся",
    id: 12,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: ImagesArray[12],
    title: "Кыся",
    id: 13,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: ImagesArray[13],
    title: "Кыся",
    id: 14,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: ImagesArray[14],
    title: "Кыся",
    id: 15,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: 'https://cdn.create.vista.com/api/media/medium/396212646/stock-photo-panoramic-crop-smiling-young-asian?token=',
    title: "Кыся",
    id: 16,
    isLiked: true,
    comments: [
      {
        text: 'Ещё один котик',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: ImagesArray[15],
    title: "Кыся",
    id: 17,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: ImagesArray[16],
    title: "Кыся",
    id: 18,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: ImagesArray[17],
    title: "Кыся",
    id: 19,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: 'https://ttelka.com/uploads/posts/2023-01/thumbs/1673792061_44-ttelka-com-p-erotika-kitayanka-gospozha-51.jpg',
    // link: 'http://archivegalleries.net/collection/ao30/2022/07/X2a5gkQ/11.jpg',
    title: "Кван Чхэ",
    id: 20,
    isLiked: true,
    comments: [
      {
        text: 'Замечательная работа! Хочу такого же кота!',
        date: '24/5/2021'
      }
    ]
  },
  {
    link: 'https://cdn.create.vista.com/api/media/medium/419106020/stock-photo-portrait-beautiful-young-asian-woman?token=',
    title: "Кван Чхэ",
    id: 21,
    isLiked: true,
    comments: [
      {
        text: 'На жёлтом фоне',
        date: '24/5/2021'
      }
    ]
  }
]

const galleryReducer = (state = initialState) => {
  return state;
}

export const addPostActionCreator = () => ({
  type: ADD_COMMENT
})

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_COMMENT_TEXT, newText: text
})

export default galleryReducer  