import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  let query = firebase.firestore().collection('users');

  if (following.length > 0) {
    query = query.where('userId', 'not-in', [...following, userId]);
  } else {
    query = query.where('userId', '!=', userId);
  }
  const result = await query.limit(10).get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));

  return profiles;
}

export async function updateFollowing(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));
}

export async function updateFollowers(userId) {
  let query = firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId);
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user doc id (user A)
  profileId, // the user that user A requerst to follow
  isFollowingProfile // true/false (is user A currently following the user)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, // followed profile
  loggedInUserDocId, // user who is trying to follow
  isFollowingProfile // true/false currently following the user
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
}

export async function getPhotos(userId, following) {
  //get photos where loggen in user is in following array?
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // then get user by userId from the photo info
      const user = await getUserByUserId(photo.userId);
      // username of owner of the photo
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
