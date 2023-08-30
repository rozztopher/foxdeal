
exports.get = async (req, res) =>{
    try {
     
        return res.json({ jwtToken })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}