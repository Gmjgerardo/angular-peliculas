import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, MapOptions, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordinate } from './Coordinates';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  @Output() selectedCoordinate: EventEmitter<Coordinate> = new EventEmitter<Coordinate>();
  
  @Input() initialCoordinates: Coordinate[] = [];
  @Input() height: number = 200;
  @Input() width: number = 200;
  @Input() readonly: boolean = false;

  markers: Marker<any>[] = [];

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      })
    ],
    zoom: 14,
    center: latLng(20.648204004447127, -103.31999658139843)
  }

  private markerOptions: MarkerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  ngOnInit(): void {
    // Convert coordinate points into markers to show in the map
    this.markers = this.initialCoordinates.map(point => marker([point.lat, point.lng], this.markerOptions)
                                          .bindPopup(point.text ?? '', {autoClose: false, autoPan: false})
    ) as unknown as Marker<any>[];
  }

  clickHandle(event: LeafletMouseEvent): void {
    if (!this.readonly) {
      const {lat, lng } = event.latlng;
  
      this.markers = [];
      this.markers.push(marker([lat, lng], this.markerOptions))
      this.selectedCoordinate.emit({lat, lng} as Coordinate);
    }
  }
}
