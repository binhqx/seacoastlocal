<?php
function seacoastlocal_alpha_preprocess_html(&$vars) {

	$path = drupal_get_path_alias($_GET['q']);
	$aliases = explode('/', $path);

	foreach($aliases as $alias) {
		$vars['classes_array'][] = drupal_clean_css_identifier($alias);
	} 
}