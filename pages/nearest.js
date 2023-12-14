// pages/index.js
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import turf from '@turf/turf';

const IndexPage = () => {
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3VyYWpzaW5naGJpc2h0IiwiYSI6ImNscTN1ajZmMDAwYWYyaWxvemJkeXh4bXcifQ.GVY_1nPPxmbhnCl_O_OnMg';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-84.5, 38.05],
            zoom: 12,
        });

        const hospitals = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'VA Medical Center -- Leestown Division',
                        'Address': '2250 Leestown Rd'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.539487, 38.072916]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'St. Joseph East',
                        'Address': '150 N Eagle Creek Dr'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.440434, 37.998757]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Central Baptist Hospital',
                        'Address': '1740 Nicholasville Rd'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.512283, 38.018918]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'VA Medical Center -- Cooper Dr Division',
                        'Address': '1101 Veterans Dr'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.506483, 38.02972]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Shriners Hospital for Children',
                        'Address': '1900 Richmond Rd'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.472941, 38.022564]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Eastern State Hospital',
                        'Address': '627 W Fourth St'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.498816, 38.060791]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Cardinal Hill Rehabilitation Hospital',
                        'Address': '2050 Versailles Rd'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.54212, 38.046568]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'St. Joseph Hospital',
                        'ADDRESS': '1 St Joseph Dr'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.523636, 38.032475]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'UK Healthcare Good Samaritan Hospital',
                        'Address': '310 S Limestone'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.501222, 38.042123]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'UK Medical Center',
                        'Address': '800 Rose St'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.508205, 38.031254]
                    }
                }
            ]
        };

        const libraries = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Village Branch',
                        'Address': '2185 Versailles Rd'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.548369, 38.047876]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Northside Branch',
                        'ADDRESS': '1733 Russell Cave Rd'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.47135, 38.079734]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Central Library',
                        'ADDRESS': '140 E Main St'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.496894, 38.045459]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Beaumont Branch',
                        'Address': '3080 Fieldstone Way'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.557948, 38.012502]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Tates Creek Branch',
                        'Address': '3628 Walden Dr'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.498679, 37.979598]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'Name': 'Eagle Creek Branch',
                        'Address': '101 N Eagle Creek Dr'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-84.442219, 37.999437]
                    }
                }
            ]
        };
        map.on('load', () => {
            map.addLayer({
                id: 'hospitals',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: hospitals
                },
                layout: {
                    'icon-image': 'hospital',
                    'icon-allow-overlap': true
                },
                paint: {}
            });

            map.addLayer({
                id: 'libraries',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: libraries
                },
                layout: {
                    'icon-image': 'library',
                    'icon-allow-overlap': true
                },
                paint: {}
            });

            map.addSource('nearest-hospital', {
                type: 'geojson',
                data: {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });

            const popup = new mapboxgl.Popup();

            map.on('mousemove', (event) => {
                const features = map.queryRenderedFeatures(event.point, {
                    layers: ['hospitals', 'libraries']
                });
                if (!features.length) {
                    popup.remove();
                    return;
                }

                const feature = features[0];

                popup
                    .setLngLat(feature.geometry.coordinates)
                    .setHTML(feature.properties.Name)
                    .addTo(map);

                map.getCanvas().style.cursor = features.length ? 'pointer' : '';
            });

            map.on('click', (event) => {
                const libraryFeatures = map.queryRenderedFeatures(event.point, {
                    layers: ['libraries']
                });
                if (!libraryFeatures.length) {
                    return;
                }

                const libraryFeature = libraryFeatures[0];

                const nearestHospital = turf.nearest(libraryFeature, hospitals);

                if (nearestHospital === null) return;
                map.getSource('nearest-hospital').setData({
                    'type': 'FeatureCollection',
                    'features': [nearestHospital]
                });

                if (map.getLayer('nearest-hospital')) {
                    map.removeLayer('nearest-hospital');
                }

                map.addLayer(
                    {
                        id: 'nearest-hospital',
                        type: 'circle',
                        source: 'nearest-hospital',
                        paint: {
                            'circle-radius': 12,
                            'circle-color': '#486DE0'
                        }
                    },
                    'hospitals'
                );
            });
        });

        return () => {
            map.remove(); // Cleanup map on unmount
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div>
            <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
        </div>
    );
};

export default IndexPage;
