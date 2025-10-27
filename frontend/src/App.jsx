import React from 'react';
import APODViewer from './components/APODViewer';
import NasaImageSearch from './components/NasaImageSearch';
import NeoChart from './components/NeoChart';

export default function App(){
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>NASA Explorer</h1>
        <p>Explore APOD, Space images and Near-Earth Objects</p>
      </header>
      <main>
        <section className="layout-row">
          <APODViewer />
          <NasaImageSearch />
        </section>
        <section>
          <NeoChart />
        </section>
      </main>
      <footer className="app-footer">Built with ❤️ using NASA APIs</footer>
    </div>
  );
}
