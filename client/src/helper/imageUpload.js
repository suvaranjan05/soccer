import axios from 'axios';
import toast from 'react-hot-toast';

export const imageUpload = async (file, setImage, setUpload) => {
    if (!file) {
        toast.error("Please Select an Image!");
        return;
    }

    if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
    ) {
        toast.error("Please Select a JPG or PNG Image!");
        return;
    }

    if (file.size > 500 * 1024) {
        toast.error("Image size should be less than 500KB!");
        return;
    }

    try {
        setUpload(true)
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "suvaranjan");

        const res = axios.post(
            "https://api.cloudinary.com/v1_1/suvaranjan/image/upload",
            data
        );

        toast.promise(res, {
            loading: `Uploading..`,
            success: (res) => {
                setImage(res.data.url.toString())
                console.log("Image Uploaded", res.data.url.toString());
                return "Image Uploaded";
            },
            error: (e) => {
                console.error(e);
                return "An error occurred";
            },
        });
    } catch (error) {
        console.log(error);
        toast.error("Error uploading image");
    } finally {
        setUpload(false);
    }
};