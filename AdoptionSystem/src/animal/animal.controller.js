import Animal from '../animal/animal.model.js'


export const saveAnimal = async(req,res)=>{
    try{
        let data = req.body;
        let animal = new Animal(data);
        await animal.save();

        return res.send({message:'Animal saved successfully :)'})
    }catch(er){
        console.error('Error ;( ',er);
        return res.status(500).send({message:`Animal don't save `,er});
    }
}
export const getAnimal = async(req,res)=>{
    try{
        let animal = await Animal.find();
        if(!animal) return res.status(404).send({message: 'Animals not found'});
        return res.send({message: 'Animals found: ', animal});
    }catch(er){
        console.error('Error ;(' ,er);
        return res.status(500).send({message: 'Error :' , er});
    }
}

export const getAnimalById = async(req,res)=>{
    try{
        let id = req.params.id
        let animal = await Animal.findById(id);
        if(!animal) return res.status(404).send({message: 'Animal not found'});
        return res.send({message: 'Animal found: ', animal});
    }catch(er){
        console.error('Error ;(' ,er);
        return res.status(500).send({message: 'Error :' , er});
    }
}

export const updateAnimal = async(req,res)=>{
    try{
        let id = req.params.id
        let data = req.body
        let animal = await Animal.findByIdAndUpdate(id,data,{new:true});
        if(!animal)return res.status(404).send({message: `Animal not found`})
        return res.send({message: 'Animal updated: ', animal});
    }catch(er){
        console.error('Error ;(' ,er);
        return res.status(500).send({message: 'Error :' , er});
    }

}

export const deleteAnimal = async(req,res)=>{
    try{
        let id = req.params.id
        let animal = await Animal.findById(id);
        if(!animal)return res.status(404).send({message: `Animal not found`})
        await Animal.deleteOne(animal);
        return res.send({message: 'Animal deleted'});
    }catch(er){
        console.error('Error ;(' ,er);
        return res.status(500).send({message: 'Error :' , er});
    }
}