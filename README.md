# Refden Word Add-in

https://appsource.microsoft.com/en-us/product/office/WA104381598

## Dev

### Setup

- Install deps: `yarn`
- Start server: `yarn start` (visit browser in https mode, if not last step won't work)
- Use account at https://onedrive.live.com/
- In Word online go to:
     - Home > Add-ins > Manage My Add-ins > Upload My Add-in
     - Choose: `refden-add-in-manifest.dev.xml`
- In Word for Mac: https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac#sideload-an-add-in-in-office-on-mac

### CI

We use linter & tests:

- `yarn lint`
- `yarn test`

### Errors

We use Rollbar for catching errors:

https://docs.rollbar.com/docs/browser-js

## Links

- Icons Fabric: https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
- https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-get-started-react
