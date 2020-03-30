import * as React from "react";
import ReactMapboxGl, { Layer, Marker, Feature } from "react-mapbox-gl";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { DashboardHome } from "components/Dashboard/DashboardHome";
// tslint:disable-next-line:no-var-requires
const { token, styles } = require("./config.json");

const DetailWrapper = styled.div`
  position: absolute;
  padding: 20px;
  background: white;
  width: 400px;
  height: 600px;
  top: 120px;
  left: 50px;
  z-index: 2;
  border-radius: 6px;
  @media (max-width: 600px) {
    width: 400px;
    height: 200px;
    top: 450px;
  }
`;

const Map = ReactMapboxGl({ accessToken: token });

const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;

const mapStyle = {
  flex: 1
};

const examplePoints = [
  [121.5318, 25.0478],
  [121.5311073, 25.1336539],
  [121.5373, 25.10336539],
  [121.5111073, 25.10336539],
  [121.6711073, 25.10336539],
  [121.711073, 25.10336539],
  [121.5715073, 25.10336539],
  [121.5714073, 25.10336539],
  [121.5713073, 25.10336539],
  [121.5716073, 25.10336539],
  [121.4711073, 25.36539],
  [121.5711073, 25.023539],
  [121.5311073, 25.046539],
  [121.5234, 25.0836539],
  [121.53273, 25.7336539],
  [121.55613, 25.0316539],
  [121.57737173, 25.0636539],
  [121.52371173, 25.5336539],
  [121.517114, 25.1336365]
];

export interface Place {
  id: string;
  name: string;
  center: [number, number];
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  height: -moz-available; /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  height: fill-available;
`;

const req = (url: string, body?: any, method = "GET") =>
  new Request(url, {
    method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Charset": "utf-8"
    }),
    body
  });

const geocodingUrl = "https://api.mapbox.com/geocoding/v5";
// tslint:disable-next-line:max-line-length
const mapboxGeocoding = (query: string) =>
  `${geocodingUrl}/mapbox.places/${query}.json?access_token=${token}`;

const paintLayer = {
  "fill-extrusion-color": "#aaa",
  "fill-extrusion-height": {
    type: "identity" as "identity",
    property: "height"
  },
  "fill-extrusion-base": {
    type: "identity" as "identity",
    property: "min_height"
  },
  "fill-extrusion-opacity": 0.6
};

export interface Props {
  // tslint:disable-next-line:no-any
  onStyleLoad?: (map: any) => any;
  ipData: any;
}

export interface State {
  query: string;
  options: Place[];
  selected?: Place;
  center: [number, number];
  subscribed: boolean;
}

class ThreeDMap extends React.Component<Props, State> {
  public state: State = {
    subscribed: false,
    query: "",
    options: [],
    selected: undefined,
    center: [this.props.ipData.longitude, this.props.ipData.latitude]
  };

  private zoom: [number] = [15];
  private bearing: [number] = [-60];
  private pitch: [number] = [60];

  // tslint:disable-next-line:no-any
  private onStyleLoad = (map: any) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };
  private fetch = (query: string) => {
    fetch(req(mapboxGeocoding(query)))
      .then((res: any) => res.json())
      .then((data: any) => {
        this.setState({
          options: data.features
            .filter((place: any) => place.place_type.includes("poi"))
            .map((poi: any) => ({
              id: poi.id,
              center: poi.center,
              name: poi.text
            }))
        });
      });
  };

  private onSelectItem = (index: number) => {
    const selected = this.state.options[index];
    console.log(selected);
    this.setState({
      selected,
      center: selected.center
    });
  };

  private onSearch = (query: string) => {
    this.setState({ query });
    this.fetch(query);
  };
  public componentDidMount() {
    console.log(this.state);
  }

  private getCirclePaint = () => ({
    "circle-radius": {
      base: 1.75,
      stops: [
        [12, 7],
        [22, 180]
      ]
    },
    "circle-color": "#E54E52",
    "circle-opacity": 0.8
  });

  public render() {
    const { options, selected, center } = this.state;
    const num = examplePoints.length;
    return (
      <Container>
        <Dropdown
          onSearch={this.onSearch}
          onSelectItem={this.onSelectItem}
          options={options}
        />
        <DetailWrapper>
          {this.state.subscribed ? (
            <>
              <h2>
                {this.props.ipData.city}, {this.props.ipData.country_name}{" "}
              </h2>
              <br />
              <br />
              <p>
                There are currently <strong>{num}</strong> people not feeling
                well around this area.
              </p>
              <p>
                <strong>10</strong> of the people reported not feeling well are
                currently self-quaranting at home. and thus not showing up on
                the map.
              </p>
            </>
          ) : (
            <>
              <p>
                There are currently <strong>{num}</strong> people not feeling
                well around this area.
              </p>
              <h4>Subscribe to the real time map</h4>
              <p>
                The money will be equally distributed to the sick users who are
                willing to provide their location.
              </p>
              <div className="plan-poster">
                <div className="plan-poster-header">
                  <h4 className="plan-poster-name">
                    Real time sick people map
                  </h4>
                  <p className="plan-poster-amount">$2 a month</p>
                  <p>
                    <a
                      className="btn plan-poster-btn"
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          subscribed: true
                        });
                      }}
                    >
                      Subscribe
                    </a>
                  </p>
                </div>
              </div>
            </>
          )}
        </DetailWrapper>
        <Map
          style={styles.light}
          containerStyle={mapStyle}
          onStyleLoad={this.onStyleLoad}
          zoom={this.zoom}
          center={center}
          pitch={this.pitch}
          bearing={this.bearing}
        >
          <Layer type="circle" paint={this.getCirclePaint()}>
            {this.state.subscribed &&
              examplePoints.map(point => {
                console.log(point);
                return <Feature coordinates={point} />;
              })}
          </Layer>

          {selected && (
            <Marker coordinates={selected.center}>
              <Mark />
            </Marker>
          )}
          <Layer
            id="3d-buildings"
            sourceId="composite"
            sourceLayer="building"
            filter={["==", "extrude", "true"]}
            type="fill-extrusion"
            minZoom={14}
            paint={paintLayer}
          />
        </Map>
      </Container>
    );
  }
}

export default ThreeDMap;
