module.exports = {

    /**
     * Get list of lines from the file
     * @param {string} path - The string containing a path to a file.
     * @param {string} skip - The string defining a number of lines in a file which should be skipped.
     */
    fetchLines (path, skip) {

        const url = `${this.endpoint}?path=${path}&skip=${skip}`;

        /**
         * Parse a JSON object from API response
         * @param {string} response - The string containing a path to a file.
         * @return {JSON} The string defining a number of lines in a file which should be skipped.
         */
        function parseJSON(response) {
            return JSON.parse(response);
        }

        /**
         * Render the error message
         * @param {string} data - The string containing API response.
         */
        function displayError(data) {
            this.logListingError = {flag: true, msg: data};
            this.setState({page: data, error: true, throbber: false});
        }

        /**
         * Render data returned from API
         * @param {string} data - The string containing API response.
         */
        function displayData(data) {
            this.logListingError = {flag: false, msg: ""};
            this.setState({page: data, error: false, path: path, skip: data[data.length - 1].id, throbber: false});
        }

        /**
         * Make an ajax call to API (using window.fetch or whatwg-fetch polyfill.)
         * @param {string} url - The string containing URL.
         * @return {string} data - The string containing URL.
         */
        fetch (url)
            .then((response) => {
                response.text().then(data => {
                    if (response.status >= 200 && response.status < 300) {
                        return data
                    } else {
                        displayError.call(this, data);
                        throw new Error("Bad response from server");
                    }
                }).then(parseJSON)
                    .then((data) => {
                        displayData.call(this, data);
                    }).catch((error) => {
                    console.log('request failed', error);
                });

            }, (error) => {
                console.log(error.message);
            });
    }
};