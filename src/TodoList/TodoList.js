import React, { Component } from "react";
import BlogForm from "./BlogForm";
import BlogItem from "./BlogItem";
import Grid from "@material-ui/core/Grid";

const api_url = "https://github.com/TCabz/blog_backend_rails.git";

var proxyUrl = "https://cors-anywhere.herokuapp.com/",
  targetUrl = "https://blog-backend-p4.herokuapp.com/";
fetch(proxyUrl + targetUrl)
  .then((blob) => blob.json())
  .then((data) => {
    console.table(data);
    document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
    return data;
  })
  .catch((e) => {
    console.log(e);
    return e;
  });

class BlogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
    this.updateBlogList = this.updateBlogList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    fetch(api_url)
      .then((response) => response.json())
      .then((response_items) => {
        this.setState({
          items: response_items.reverse(),
        });
      });
  }

  updateBlogList(item) {
    let _items = this.state.items;
    // unshift adds to the beginning of the array
    _items.unshift(item);
    this.setState({
      items: _items,
    });
  }

  // delete item
  deleteItem(item) {
    // delete the item remotely
    var deleteURL = api_url + `/${item.id}`;
    fetch(deleteURL, {
      method: "DELETE",
    }).then(() => {
      var _items = this.state.items;
      var index = _items.indexOf(item);
      _items.splice(index, 1);
      this.setState({
        items: _items,
      });
    });
  }

  render() {
    console.log(this.state.items);
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlogForm api_url={api_url} updateBlogList={this.updateBlogList} />
        </Grid>

        <Grid item xs={12} id="blog_list">
          {this.state.items.map((item) => (
            <BlogItem key={item.id} item={item} deleteItem={this.deleteItem} />
          ))}
        </Grid>
      </Grid>
    );
  }
}
export default BlogList;
