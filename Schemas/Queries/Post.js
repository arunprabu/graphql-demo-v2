const { axios } = require("axios");
const { GraphQLList } = require("graphql");
const PostType = require("../TypeDefs/Post");

exports.GET_POST_LIST = {
  type: new GraphQLList(PostType),
  resolve(){
    return axios.get("https://jsonplaceholder.typicode.com/posts")
      .then( res => {
        console.log(res);
         return res.data;
      })
      .catch( err => {
        console.log(err);
      })
      .finally( ()=> {
        console.log('All are over!');
      });
  }
};