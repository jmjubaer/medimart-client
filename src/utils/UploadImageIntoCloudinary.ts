import axios from "axios";
// uploadImageIntoCloudinary
const uploadImageIntoCloudinary = async (file: string | File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bicycle-store"); // Create an upload preset in Cloudinary
    formData.append("cloud_name", "dykcsfdvi"); // Your Cloudinary cloud name

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dykcsfdvi/image/upload`,
            formData
        );

        return { imageUrl: response.data.secure_url };
    } catch (error: any) {
        console.error("Error uploading image", error);
        return { error: error.message };
    }
};

export default uploadImageIntoCloudinary;
