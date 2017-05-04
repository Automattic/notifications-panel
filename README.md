# WordPress.com Notifications Panel

> **Note** This repository isn't ready for general use. Please check before using anywhere. It's not ready for deploying to an iframe environment even though it's designed for that eventual situation. Currently as an `npm` module it brings with it no build system and only the actual source code gets included.

This repository contains the [React][react] component which displays WordPress.com notifications and provides for management of those notifications.

```js
<NotificationsPanel { ...{
	isVisible,
	locale,
	wpcom
} } />
```

## Contributing

The following sections describe what is required in order to locally develop this application.

### Authentication domain

When developing the app locally we need to fake its base URL because of the way that user authentication works.
The [OAuth application](https://developer.wordpress.com/apps/52716) will only respond to a select number of domain origins.
Thus the following line will need to exist in your local `/etc/hosts` file.
The app will be served at this address when running the development server.

```
127.0.0.1 notifications.dev
```

### Installation

After setting up the local domain mapping install the application with the following sequence of commands:

```bash
git clone git@github.com:Automattic/notifications-panel.git
cd notifications-panel
npm install
```

### Developing

With the code and dependent libraries installed run the development server with the following command:

```bash
npm start
```

After it boots up load the entry at [notifications.dev:8888](notifications.dev:8888) in your browser.

[react]: https://facebook.github.io/react/
