<?php

    $have_icon = (isset($icon_array) &&  !empty($icon_array) ) ? 'tag-icon' : 'tag-img';
?>
<div class="item-tag <?php echo esc_attr($have_icon); ?>">
<?php if (isset($tab['images']) && !empty($tab['images'])): ?>

	<?php
        $tag_id 		= 	$tab['images'];

        $shop_now       = (isset($tab['shop_now'])) ? $tab['shop_now'] : false;
        $shop_now_text  = (isset($tab['shop_now_text'])) ? $tab['shop_now_text'] : '';
        $description    = (isset($tab['description'])) ? $tab['description'] : '';
    ?>

    <a href="<?php echo esc_url($tag_link); ?>">
        <?php echo wp_get_attachment_image($tag_id, 'full', false, array('alt'=> $tag_name )); ?>
    </a>

<?php elseif (isset($icon_array) &&  !empty($icon_array) ): ?>

    <a href="<?php echo esc_url($tag_link); ?>">
        <?php if( $icon_array['has_svg'] ) : ?>
            <?php echo trim($icon_array['svg']); ?>
        <?php else: ?>
            <i class="<?php echo esc_attr($icon_array['iconClass']); ?>"></i>
        <?php endif; ?>
        
    </a>

<?php endif; ?>
    <div class="content">
        <a href="<?php echo esc_url($tag_link); ?>" class="tag-name"><?php echo trim($tag_name); ?></a>

        <div class="tag-hover">
            <?php if ($count_item == 'yes') { ?>
                <span class="count-item"><?php echo trim($tag_count).' '.esc_html__('items', 'urna'); ?></span>
            <?php } ?>

            <?php

                if (!empty($description)) {
                    echo '<div class="description">'. trim($description) .'</div>';
                }

                if (!empty($shop_now)) {
                    echo '<a class="shop-now" href="'. esc_url($tag_link) .'" >'. trim($shop_now_text) .'</a>';
                }
                
            ?>

        </div>
  
   </div>
</div>