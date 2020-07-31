import React, { Component } from 'react';
import { Intro } from './Intro';
import { Tutorial } from './Tutorial';
import { Components } from './Components';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import {
  AppLayout,
  DrawerToggle,
  Tabs,
  Tab
} from 'react-vaadin-components';

class App extends Component {

  pages = [
    {title: 'Intro', path: "/intro", component: Intro},
    {title: 'Tutorial', path: "/tutorial", component: Tutorial},
    {title: 'Components', path: "/components/:component?", component: Components},
  ]

  getRootPath = page => page.path.split('/:')[0]

  onTabChanged = e => this.setState({activePage: this.pages[e.detail.value]})

  onHashChange = () => this.setState({activePage: this.pages.filter(p => window.location.href.indexOf(this.getRootPath(p)) > -1)[0] || this.pages[0] })

  state = {}

  componentWillMount() {
    this.onHashChange()
  }

  constructor() {
    super();
    window.addEventListener('hashchange', this.onHashChange);
  }

  render() {
    const rootPath = this.getRootPath(this.state.activePage);
    const shouldRedirect = window.location.href.indexOf(rootPath) === -1;

    return (
      <HashRouter>
        <AppLayout>
          <DrawerToggle slot="navbar touch-optimized" />
          <h3 slot="navbar touch-optimized">React Vaadin Components</h3>
          <Tabs
            orientation="vertical"
            slot="drawer"
            onSelectedChanged={this.onTabChanged}
            selected={this.pages.indexOf(this.state.activePage)}
          >
            {this.pages.map((page) => (
              <Tab key={page.path}>{page.title}</Tab>
            ))}
          </Tabs>

          <div style={{height: '100%', overflowX: 'hidden'}}>
            {this.pages.map(page => <Route key={page.path} path={page.path} component={page.component} /> )}

            {shouldRedirect && <Redirect to={rootPath} push />}
          </div>

        </AppLayout>
      </HashRouter>
    );
  }

}

export default App;
