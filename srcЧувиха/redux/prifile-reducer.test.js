import profileReducer, {addPostActionCreator, deletePost} from "./prifile-reducer";
import React from "react";

let state = {
    postsData: [
        {
            id: 1,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dicta modi maxime, hic ' +
                'culpa debitis, placeat quae neque autem aliquid incidunt! Eum laborum aliquam aperiam?',
            imgSrc: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg',
            valueLike: 12,
        },
        {
            id: 2,
            message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore laboriosam nemo, ' +
                'beatae consectetur dolores error commodi eaque sapiente placeat in. Esse, recusandae hic!',
            imgSrc: 'https://i.pinimg.com/564x/3c/e6/25/3ce625ab130460755d1475fb033652f2.jpg',
            valueLike: 39,
        },
    ],
}

test('Length of posts should be incremented', () => {
    let action = addPostActionCreator('Hi');
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(3)
});

test('Message of new post should be correct', () => {
    let action = addPostActionCreator('Hi');
    let newState = profileReducer(state, action);
    expect(newState.postsData[2].message).toBe('Hi')
});

test('After deleting length of posts should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(1)
});

test('After deleting length of posts shouldn\'t be decrement if id is incorrect', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(2)
});