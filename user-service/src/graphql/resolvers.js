import User from '../models/Users';

const resolvers = {
    getUser: async ({ id }) => {
        return await User.findById(id);
    },
    getUsers: async ({ }) => {
        return await User.find();
    },
    createUser: async ({ userName, password, name, email, age }) => {
        const newUser = new User({ userName, password, name, email, age });
        await newUser.save();
        return newUser;
    },
}

export default resolvers;