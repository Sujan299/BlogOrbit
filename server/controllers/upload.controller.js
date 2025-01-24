const uploadImage = (req, res)=>{
    if(!req.file){
        return res.status(400).send("No file uploaded.");
    }
    const imageUrl = `https://blogorbit.onrender.com/uploads/${req.file.filename}`;

    res.status(200).json({url: imageUrl});
}
export default uploadImage;