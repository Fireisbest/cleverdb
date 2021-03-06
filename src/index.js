module.exports = function(file) {

    const Database = require("better-sqlite3");
    const util = require("util");
    let db;

    
    if (!db) db = new Database(file || "./json.sqlite");

    
    var methods = {
        fetch: require("./methods/fetch.js"),
        set: require("./methods/set.js"),
        add: require("./methods/add.js"),
        subtract: require("./methods/subtract.js"),
        push: require("./methods/push.js"),
        delete: require("./methods/delete.js"),
        has: require("./methods/has.js"),
        all: require("./methods/all.js"),
        type: require("./methods/type"),
    };

    module = {

        version: require("../package.json").version,

        fetch: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("fetch", { id: key, ops: ops || {} });
        },
        get: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("fetch", { id: key, ops: ops || {} });
        },

        set: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            if (value === undefined)
                throw new TypeError(
                    "No value specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("set", {
                id: key,
                data: value,
                ops: ops || {},
            });
        },

        add: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            if (isNaN(value))
                throw new TypeError(
                    "Must specify value to add. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("add", { id: key, data: value, ops: ops || {} });
        },


        subtract: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            if (isNaN(value))
                throw new TypeError(
                    "Must specify value to add. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("subtract", { id: key, data: value, ops: ops || {} });
        },



        push: function (key, value, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            if (!value && value != 0)
                throw new TypeError(
                    "Must specify value to push. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("push", {
                id: key,
                data: value,
                ops: ops || {},
            });
        },


        delete: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("delete", { id: key, ops: ops || {} });
        },

        has: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("has", { id: key, ops: ops || {} });
        },

        includes: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("has", { id: key, ops: ops || {} });
        },

        /**
         * This function fetches the entire active table
         * @param {options} [input={ target: null }] Any options to be added to the request.
         * @returns {boolean} if it exists.
         */

        all: function (ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        fetchAll: function (ops) {
            return arbitrate("all", { ops: ops || {} });
        },

        /*
         * Used to get the type of the value.
         */

        type: function (key, ops) {
            if (!key)
                throw new TypeError(
                    "No key specified. Need Help? https://discord.gg/A7CKxDZERy"
                );
            return arbitrate("type", { id: key, ops: ops || {} });
        },

        /**
         * Using 'new' on this function creates a new instance of a table.
         * @param {name} input any string as the name of the table.
         * @param {options} options.
         */

        table: function (tableName, options = {}) {
            // Set Name
            if (typeof tableName !== "string")
                throw new TypeError(
                    "Table name has to be a string. Need Help? Check out: https://discord.gg/A7CKxDZERy"
                );
            else if (tableName.includes(" "))
                throw new TypeError(
                    "Table name cannot include spaces. Need Help? Check out: https://discord.gg/A7CKxDZERy"
                );
            this.tableName = tableName;

            // Methods
            this.fetch = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "fetch",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.get = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "fetch",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.set = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                if (!value && value != 0)
                    throw new TypeError(
                        "No value specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "set",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.add = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                if (isNaN(value))
                    throw new TypeError(
                        "Must specify value to add. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "add",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.subtract = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                if (isNaN(value))
                    throw new TypeError(
                        "Must specify value to add. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "subtract",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.push = function (key, value, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                if (!value && value != 0)
                    throw new TypeError(
                        "Must specify value to push. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "push",
                    { id: key, data: value, ops: ops || {} },
                    this.tableName
                );
            };

            this.delete = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "delete",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.has = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "has",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.includes = function (key, ops) {
                if (!key)
                    throw new TypeError(
                        "No key specified. Need Help? Check Out: https://discord.gg/A7CKxDZERy"
                    );
                return arbitrate(
                    "has",
                    { id: key, ops: ops || {} },
                    this.tableName
                );
            };

            this.fetchAll = function (ops) {
                return arbitrate("all", { ops: ops || {} }, this.tableName);
            };

            this.all = function (ops) {
                return arbitrate("all", { ops: ops || {} }, this.tableName);
            };
        },
    };

    function arbitrate(method, params, tableName) {
        if(typeof params.id == 'number') params.id = params.id.toString()
        
        let options = {
            table: tableName || params.ops.table || "json",
        };

        
        db.prepare(
            `CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`
        ).run();

      
        if (params.ops.target && params.ops.target[0] === ".")
            params.ops.target = params.ops.target.slice(1);

        if (params.data && params.data === Infinity)
            throw new TypeError(
                `You cannot set Infinity into the database @ ID: ${params.id}`
            );

       
        try {
            params.data = JSON.stringify(params.data);
        } catch (e) {
            throw new TypeError(
                `Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`
            );
        }

      
        if (params.id && params.id.includes(".")) {
            let unparsed = params.id.split(".");
            params.id = unparsed.shift();
            params.ops.target = unparsed.join(".");
        }

        
        return methods[method](db, params, options);
    }
    
    return module;
}

