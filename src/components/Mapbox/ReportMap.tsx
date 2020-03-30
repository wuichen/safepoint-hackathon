import * as React from "react";
import ReactMapboxGl, { Layer, Marker, Feature } from "react-mapbox-gl";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { functions } from "../../firebase";

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
  // @media (max-width: 600px) {
  //   width: 400px;
  //   height: 200px;
  //   top: 450px;
  // }
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
  record_id: string;
}

export interface State {
  query: string;
  options: Place[];
  selected?: Place;
  center: [number, number];
  note: string;
  condition: string;
  loading: boolean;
  message: string;
  located: boolean;
  submitted: boolean;
}

class ThreeDMap extends React.Component<Props, State> {
  public state: State = {
    condition: "same",
    note: "",
    located: false,
    query: "",
    options: [],
    loading: false,
    submitted: false,
    message: "",
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
  private onSubmit = (values: any) => {
    functions
      .createLocation({
        note: this.state.note,
        condition: this.state.condition,
        center: this.state.center,
        city: this.props.ipData.city,
        country: this.props.ipData.country_name,
        record_id: this.props.record_id
      })
      .then(response => {
        console.log(response);
        this.setState({
          ...this.state,
          submitted: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  private storePosition = (position: any) => {
    console.log(position);
    this.setState({
      ...this.state,
      center: [position.coords.longitude, position.coords.latitude],
      located: true
    });
  };

  public render() {
    const {
      options,
      selected,
      center,
      note,
      condition,
      loading,
      located,
      message
    } = this.state;
    const num = 1;
    return (
      <Container>
        <Dropdown
          onSearch={this.onSearch}
          onSelectItem={this.onSelectItem}
          options={options}
        />
        <DetailWrapper>
          {this.state.submitted ? (
            <>
              <h3>Thank you for letting us know how you're feeling!</h3>
              <div>
                We will reward you with{" "}
                <strong>$0.08 worth of USD in ETH</strong> for your contribution
                in letting the society follow up with your health condition
              </div>
            </>
          ) : (
            <>
              <h2>Location and symptons update</h2>
              <br />
              <p>
                <div className="field">
                  {located ? (
                    <h4>located!</h4>
                  ) : (
                    <button
                      onClick={e => {
                        e.preventDefault();
                        navigator.geolocation.getCurrentPosition(
                          this.storePosition
                        );
                      }}
                      className="btn"
                      disabled={loading}
                    >
                      Locate me
                    </button>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="condition">Are you feeling better?</label>
                  <select
                    id="condition"
                    value={condition}
                    onChange={e =>
                      this.setState({
                        ...this.state,
                        condition: e.target.value
                      })
                    }
                  >
                    <option key="yes" value="recovered">
                      I've completely recovered!
                    </option>
                    <option key="no" value="better">
                      I'm feeling better
                    </option>
                    <option key="no" value="same">
                      I'm feeling the same
                    </option>
                    <option key="no" value="worse">
                      I'm feeling worse
                    </option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="note">Anything else you want to add?</label>
                  <input
                    type="text"
                    name="note"
                    id="note"
                    placeholder="Please type here"
                    value={note}
                    onChange={e =>
                      this.setState({ ...this.state, note: e.target.value })
                    }
                  />
                </div>

                <div className="field">
                  <button
                    onClick={this.onSubmit}
                    type="submit"
                    className="btn"
                    disabled={loading}
                  >
                    Submit Update
                  </button>
                </div>
              </p>
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
            <Feature coordinates={this.state.center} />
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
