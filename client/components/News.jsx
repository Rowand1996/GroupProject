import React, { useState, Fragment } from "react";
import NavBar from "./NavBar.jsx";
import { data } from "jquery";

class News extends React.Component {
    constructor() {
        super()
        this.state = { News: [] }
    }
    async componentDidMount() {
        var url = 'http://newsapi.org/v2/everything?' +
            'q=covid-19&' + 'q=coronavirus&' + 'q=coronaVirusNewCases$' +
            'from=2020-08-06&' +
            'sortBy=relevancy&' +
            'apiKey=5aad1f9141e948779de4fc1555818ea7';

        var req = new Request(url);
        let res = await fetch(req)
        let News = await res.json()
        // .then(data => console.log(data))
        this.setState({ News: News.articles })
    }
    async componentDidUpdate() {
        console.log(this.state.News);
    }

    render() {
        return (
            <Fragment>
                <NavBar />
                <div id="leftAlign" className="container">
                    <h1 id="news-header">Coronavirus News</h1>
                    <hr className="lineUnderTitle"></hr>
                    {this.state.News.map((x, index) => {
                        return (
                            <>
                                <div className="card shadow mb-3 bg-white rounded wholeCard" key={index}>
                                    <div className="card-body" >
                                        <div className="floatRight">
                                            <h5 className="card-title mb-0 ">{x.title}</h5>
                                            <p className="card-text mb-0 cardName ">Source: {x.source.name}</p>
                                            <p className="card-text mb-0 cardDescription ">Description: {x.description}</p>
                                        <div className="buttonDiv d-flex justify-content-left">
                                            {/* <button className="btn btn-primary btn-sm"><a href={} id="news-link">Link to Site</a></button> */}
                                            <a id="news-link" href={x.url}>Read More...</a>
                                        </div>
                                        </div>
                                        <img src={x.urlToImage} className="img-thumbnail rounded shadow mt-1 mb-2 d-block" id="news-img" alt="" />
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </Fragment>
        )
    }
}

export default News


















