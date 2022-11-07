<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ahmedbin_wp69' );

/** Database username */
define( 'DB_USER', 'ahmedbin_wp69' );

/** Database password */
define( 'DB_PASSWORD', '[35SLpS1[9' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'bd79edprz7pmtjsixshymetonb7y3jc5wiezaxbi5a9v5vjmt1fdmoclodkcgp0m' );
define( 'SECURE_AUTH_KEY',  'sctmza4dmzanijnvgdgeszk2ztxl60nnogdoziym7j3aijyko9b21xqww0bt4ebl' );
define( 'LOGGED_IN_KEY',    '9vffrtnqzcghbshowf0rq3am0s0nyv2j1p7th1zpyu7u8jcj3vffyyhc959igq8e' );
define( 'NONCE_KEY',        'jwantlxlqe4jjvzjyfeus0n7bxjc3xnwqsclxwfwumgfpgnib3abfkjapuau7u0i' );
define( 'AUTH_SALT',        'lxhkbc9mkgbp8thqt6hqcxznjaw5uvzjpcewrsiiu6rr7ggma8njkle4clzzf7x2' );
define( 'SECURE_AUTH_SALT', '52sose65tkqvszhkvfc2rlvzaewn54nn7qijluzmwunjfpv7sr95zayo68wzapwm' );
define( 'LOGGED_IN_SALT',   'tdjfkze0jq82nmfhrez6fz7l9ci4kjrdxewasckmgwmqyjfuaqvn82ok9wvtb5hq' );
define( 'NONCE_SALT',       'hcgy7qzgp4ymzufh4lsuglnnhlgylshkwrjpna5ypafnbjzrqciapiou12litv8j' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wptd_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
