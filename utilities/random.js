import * as ImagePicker from "expo-image-picker";

//pending better name/place, just getting
//parse out of Chat for readability
import { uploadImageToStorage, getImageURLFromStorage } from "./dbInteraction";
//images
const getPermissionAsync = async () => {
  if (Platform.OS === "ios") {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};
export const selectAndUploadImage = async () => {
  getPermissionAsync();
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const imageName = result.uri.split("/").pop();
      uploadImageToStorage(result.uri, imageName)
        .then(() => {
          //check if the image name is different now maybe?
          return getImageURLFromStorage(result.uri);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (E) {
    console.log(E);
  }
};

//parse messages on load from in DB in chat
export const parseMessages = (snapshot) => {
  var { timestamp: numberStamp, text, user, image } = snapshot.val();
  const { key: _id } = snapshot;
  const createdAt = new Date(numberStamp);
  function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n));
    }

    return ret;
  }
  var temp = chunk(text, 30).join(String.fromCharCode(10));
  text = temp;
  const message = {
    _id,
    createdAt,
    text,
    user,
    image,
  };

  return message;
};
