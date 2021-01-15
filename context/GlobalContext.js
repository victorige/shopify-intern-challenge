import React from 'react';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {

  /**
   * Returns array of images
   * @returns {Array}
   */
  async function loadImages() {
    return fetch('/api/images', {
      method: "GET",
      headers: {"Content-type": "application/json"}
    })
      .then( async(response) => {
        const responseJson = await response.json();
        return responseJson.data
      })
      .catch(err => { 
        return alert("Error: " + err.message) 
      });
  }

  /**
   * @param {Array} dataImage - the images array to sort.
   * @param {string} dataBy - one property names to sort.
   * @param {string} dataOrder - one sort order. `'asc'`, `'desc'`
   * @returns {Array} Returns the sorted array.
   */
  const sortImages = (dataImage, dataBy, dataOrder) => {
    
    return dataImage.sort(
      function (aIndex, bIndex, byIndex = 0) {
        let result, a, b

        a = aIndex[[dataBy][byIndex]]
        b = bIndex[[dataBy][byIndex]]

        if(typeof a === "string"){
          a = a.toUpperCase()
        }

        if(typeof b === "string"){
          b = b.toUpperCase()
        }

        if(a < b){
          result = -1
        }else if(a > b){
          result = 1
        }else{
          result = 0
        }

        if (dataOrder === 'desc') {
          result = result * -1
        }

        if (result === 0 && [dataBy][byIndex + 1]) {
          result = (a, b, byIndex + 1)
        }

        return result;
      }
    );
    
  }

  /**
   * making function loadImages() and sortImages() available globally.
   */
  
  return (
    <>
    <GlobalContext.Provider
      value={{
        loadImages,
        sortImages
      }}
    >
      {children}
    </GlobalContext.Provider>
    </>
  );
};

export default GlobalContext;
export { GlobalProvider };
