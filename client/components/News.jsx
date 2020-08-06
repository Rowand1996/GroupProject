import React, { useState, Fragment } from "react";
import NavBar from "./NavBar.jsx";
import { data } from "jquery";
import './news.css'

class News extends React.Component {
    constructor() {
        super()
        this.state = { News: [] }
    }
    async componentDidMount() {
        var url = 'http://newsapi.org/v2/everything?' +
            'q=covid-19&' + 'q=coronavirus&' +
            'from=2020-08-06&' +
            'sortBy=popularity&' +
            'apiKey=5aad1f9141e948779de4fc1555818ea7';

        var req = new Request(url);
        let res = await fetch(req)
        let News = await res.json()
        // .then(data => console.log(data))
        this.setState({ News: News.articles })
    }
    render() {
        return (
            <Fragment>
                <NavBar />
                <div className="container">
                    <h1 className="font-weight-bold mb-0" id="news-header">Coronavirus News</h1>
                    <center>
                        <p className="mb-2">Below are some news articles relating to Covid-19.</p>
                        {this.state.News.map((x, key) => {
                            return (
                                <>
                                    <div className="card shadow p-0 mb-3 bg-white rounded col-7">
                                        <div className="card-body">
                                            <h5 key={key} className="card-title mb-0">{x.title}</h5>
                                            <p className="card-text mb-0">Source: {x.source.name}</p>
                                            <img src={x.urlToImage} className="img-thumbnail rounded shadow mt-1 mb-2 d-block" id="news-img" alt="" />
                                            <button className="btn btn-primary btn-sm"><a href={`${x.url}`} id="news-link">Link to Site</a></button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </center>

                </div>
            </Fragment>
        )
    }
}

export default News


















