import React, { Component } from 'react'
import Mapir from 'mapir-react-component';
const Map = Mapir.setToken({
    transformRequest: url => {
        return {
            url: url,
            headers: {
                "x-api-key": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJkOTlkOTQ2NDg5NjVmZjk5NmVlZTEyMzJhYWY1ZDI3YWViOTEzMmY3Y2M5MjE2YmExZDIwMTc0YWNlOTE0Y2UyMzU2YTg4YmZmMjc2ZWRmIn0.eyJhdWQiOiIxNzI5NiIsImp0aSI6ImJkOTlkOTQ2NDg5NjVmZjk5NmVlZTEyMzJhYWY1ZDI3YWViOTEzMmY3Y2M5MjE2YmExZDIwMTc0YWNlOTE0Y2UyMzU2YTg4YmZmMjc2ZWRmIiwiaWF0IjoxNjQ2NTc0ODMzLCJuYmYiOjE2NDY1NzQ4MzMsImV4cCI6MTY0ODk5MDQzMywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Z8zTkbwSQEaa2TPdTqNiUpS-wCq-koBYmovv4e9_YUj3qHMOAjmk4md3u6izRG68aR8Paq27gY4iJ54nDJcQq5988V2q92cedg7nAafTjreCmYhWWt2FuRPZ3UCW9LBxUnDYnyNxrN3HP55PuCtr3M7V3RZzP6JoMIePjPqJgSaX9U30cVyVpRKdqvmeG_6kFyl4iBicFBTiX_bFkTNYcIJ57Z77AIoYYjWjVuzAjydMYag62t5f_fiKbjf8tgfyUowFzSX8jDX7Za48ZGjHtuytt7ZQyiE_8TaE-BzpXNHrNxLS4pfQyqY8D-y6YK6LIHUB28aMernGLb2nXHxr7Q', //Mapir api key
                "Mapir-SDK": "reactjs"
            }
        };
    }
});
export default class Mapa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markerArray: [],
            lat: 35.72,
            lon: 51.42,
            lat1: 35.72,
            lon1: 51.42
        }
        this.reverseFunction = this.reverseFunction.bind(this);
    }

    transformData=(e)=>{
       this.props.func[1](e)

    }

    reverseFunction(map, e) {
        var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
        fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJkOTlkOTQ2NDg5NjVmZjk5NmVlZTEyMzJhYWY1ZDI3YWViOTEzMmY3Y2M5MjE2YmExZDIwMTc0YWNlOTE0Y2UyMzU2YTg4YmZmMjc2ZWRmIn0.eyJhdWQiOiIxNzI5NiIsImp0aSI6ImJkOTlkOTQ2NDg5NjVmZjk5NmVlZTEyMzJhYWY1ZDI3YWViOTEzMmY3Y2M5MjE2YmExZDIwMTc0YWNlOTE0Y2UyMzU2YTg4YmZmMjc2ZWRmIiwiaWF0IjoxNjQ2NTc0ODMzLCJuYmYiOjE2NDY1NzQ4MzMsImV4cCI6MTY0ODk5MDQzMywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.Z8zTkbwSQEaa2TPdTqNiUpS-wCq-koBYmovv4e9_YUj3qHMOAjmk4md3u6izRG68aR8Paq27gY4iJ54nDJcQq5988V2q92cedg7nAafTjreCmYhWWt2FuRPZ3UCW9LBxUnDYnyNxrN3HP55PuCtr3M7V3RZzP6JoMIePjPqJgSaX9U30cVyVpRKdqvmeG_6kFyl4iBicFBTiX_bFkTNYcIJ57Z77AIoYYjWjVuzAjydMYag62t5f_fiKbjf8tgfyUowFzSX8jDX7Za48ZGjHtuytt7ZQyiE_8TaE-BzpXNHrNxLS4pfQyqY8D-y6YK6LIHUB28aMernGLb2nXHxr7Q', //Mapir api key

                }
            })
            .then(response => response.json())
            .then(data => { if(window.confirm(data.postal_address)){
                this.transformData(data)
            } })
        // const array = [];
        // array.push(<Mapir.Marker
        //     coordinates={[this.state.lon, this.state.lat]}
        //     anchor="bottom">

        // </Mapir.Marker>);
        this.setState({lat1:e.lngLat.lat},()=>{
            this.setState({lon1: e.lngLat.lng})
        })
        // this.setState({ markerArray: array, lat: e.lngLat.lat,lon: e.lngLat.lng },()=>{
        //     console.log([array])
        // });
    }
    render() {
        return (
            <div style={{ textAlign: "center", width:"100%",height: "100vh" }}>
                <Mapir
                    center={[this.state.lon, this.state.lat]}
                    Map={Map}
                    onClick={this.reverseFunction}

                >
                    <Mapir.Marker
                        coordinates={[this.state.lon1, this.state.lat1]}
                        anchor="bottom">

                    </Mapir.Marker>
                </Mapir>
                </div>
        )
    }
}