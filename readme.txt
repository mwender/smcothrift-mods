=== SMCoThrift Mods ===
Contributors: the_webist
Tags: comments, spam
Requires at least: 4.5
Tested up to: 5.8.2
Stable tag: 1.7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Modifications for the SMCoThrift Elementor-powered site.

== Description ==

Setup:

1. Run `npm install`.
2. Be sure to set your `proxy_url` inside `package.json`.
3. When developing, run `npm run dev` to load your site with BrowserSync.
4. Build your CSS for production by running `npm run prod`.

== Installation ==

Install/Activate the plugin as you would any other WordPress plugin.

== Changelog ==

= 1.7.0 =
* Saving GravityForms JSON to `/lib/gf-json/` via the Power Boost for GravityForms plugin.
* Server-side override for GravityForms ID 8 on smcothrift.com: setting custom total.
* Using `wpvars.formId` in `/lib/js/pricing.js` for clarity.
* Pricing updates for SMCoThrift and ThriftTrac.

= 1.6.4 =
* Responsive layout for SMCo Thrift pricing form.

= 1.6.3 =
* Specifying width of 100% for first column of ThriftTrac and ThriftPoints pricing forms.

= 1.6.2 =
* Specifying width of 100% for second column of ThriftTrac and ThriftPoints pricing forms.

= 1.6.1 =
* Updating SASS build process in `package.json`.
* Mobile styling for ThriftTrac pricing form.
* Mobile styling for ThriftPoints pricing form.

= 1.6.0 =
* Updating pricing of "In-Store Digital Display/BrightSign" to reflect $100/month for first sign and $50/month for each additional.
* BUGFIX: `pricing.thriftpoints.js` was not respecting the `perLocation` setting in the `pricing` object.
* Switching names of `shortcodes.thrifttrac.php` and `shortcodes.thriftpoints.php` to match the contents of each file.
* Updating NPM modules.

= 1.5.2 =
* Changing "ThriftTrac" to "ThriftPoints" on pricing form.

= 1.5.1 =
* Adjusting Gravity Forms field label margins.

= 1.5.0 =
* Updating "Bundle and Save" copy.
* Email Marketing additional audiences cost $800/audience unless it's the Complete Management package. Then it's $500/additional audience.

= 1.4.1 =
* Adding "Bundle and Save" note for ThriftPoints pricing and sign up.
* Enqueuing jQuery because it wasn't getting enqueued early enough otherwise (strange?).

= 1.4.0 =
* Updating ThriftPoint pricing.

= 1.3.1 =
* Updating NPM packages.

= 1.3.0 =
* Adding ThriftTrac pricing form.

= 1.2.0 =
* Updates for SMCo Thrift Elementor powered site.

= 1.1.2 =
* Defaulting Affiliate Partners option to `Silver` package and removing options.

= 1.1.1 =
* Adding option to click Elementor Pricing Table buttons and pre-select an Affiliate Partner option.

= 1.1.0 =
* Adding "Affiliate Partner" option to Pricing Form.

= 1.0.1 =
* Removing _global.scss from main.scss compile.

= 1.0.0 =
* Initial release.

= 0.2.0 =
* Adding `uber_log()` for enhanced error logging/debugging.

= 0.1.0 =
* Initial release.
