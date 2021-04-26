export function seedDatabase(firebase) {
  const users = [
    {
      userId: 't7QmQ66ZPfbkZT7rIHX5sH9C2Bh2',
      username: 'jim',
      fullName: 'Jim Larry',
      emailAddress: 'jimlarry@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'silvester',
      fullName: 'Silvester Stalone',
      emailAddress: 'stalone@yahoo.com',
      following: [],
      followers: ['t7QmQ66ZPfbkZT7rIHX5sH9C2Bh2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'baskov',
      fullName: 'Nikolai Baskov',
      emailAddress: 'baskov@mail.ru',
      following: [],
      followers: ['t7QmQ66ZPfbkZT7rIHX5sH9C2Bh2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'oleg',
      fullName: 'Oleg Smith',
      emailAddress: 'smith@orwell.com',
      following: [],
      followers: ['t7QmQ66ZPfbkZT7rIHX5sH9C2Bh2'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'baskov',
            comment: 'Love it!'
          },
          {
            displayName: 'oleg',
            comment: 'Great Post!'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
