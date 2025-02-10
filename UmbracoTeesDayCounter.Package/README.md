# UmbracoTeesDay Counter

This is a package for Umbraco v14+ that adds a HeaderApp showing when there is an upcoming Umbraco Tees Day.

This project is like having https://isitumbracoteesday.today/ built into the Backoffice header bar.  It pulls from the canonical JSON data where UmbracoTeesDay dates are stored and displays different information in the HeaderApp's popover depending on when the next UmbracoTeesDay is.

This project is primarily meant as an example of how to build a simple Backoffice package targeting Umbraco v14+, so please use at your own risk if you want to install this on a production site somewhere.

The code in this project pulls heavily from work done in [OwainWilliams/UmbracoTeesDay](https://github.com/OwainWilliams/UmbracoTeesDay), so huge kudos to @OwainWilliams for his work.

## Installing

To install this package, add it as a dependency to your site using NuGet.

```
dotnet add package H5YR.UmbracoTeesDayCounter
```

## Contributing

Pull Requests are welcome!  Please fork this repo, create a new branch in your fork with a relevant branch name, and submit a PR back to this repo for review!  :smiley: