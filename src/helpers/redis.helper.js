const redis = require('redis')

// const client = redis.createClient(process.env.REDIS_URL);

const client = redis.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});


//redis://localhost: 6379
client.on("error", function (error) {
    console.error(error);
});

const setJWT = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            return client.set(key, value, (err, response) => {
                if (err) reject(err)
                resolve(response)
            })
        } catch (error) {
            reject(error)
        }

    })

}

const getJWT = (key) => {
    return new Promise((resolve, reject) => {
        try {
            client.get(key, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        } catch (error) {
            reject(error)
        }

    })

}

const deleteJWT = (key) => {
    try {
        client.del(key);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    setJWT,
    getJWT,
    deleteJWT
}