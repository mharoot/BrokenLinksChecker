<?php
// TODO find a way to get entry title -> .entry-title - get it as a text file same way weere doing content.  
//          also the slugs are in the folder names for ScrapedContent 
//          

// to get this number you need access to cpanel, 
// this number is the last post id is in wp_posts table.
$p = 15484;
// the 6th %d is the $post_revision_1_starting_index
$pR = $p + 1;
$post_content = "<p>Are you still dealing with paper medical records? Chances are you’re looking around for an EMR platform that meets your price and demands. Based on law and efficiency, it’s time to convert paper files to EMR.</p><h2>Why Convert Paper Files to EMR, also known as an EMR Abstraction?</h2><p>Let’s cut to the chase.</p><p>Included in the American Recovery and Reinvestment Act is a mandate that all public and private healthcare providers as well as other eligible professionals (EP) are required to adopt and demonstrate “<a title=\"Three Resources for Meaningful Use Requirements\" href=\"https://www.usfhealthonline.com/resources/healthcare/three-resources-for-meaningful-use-requirements/\">meaningful use</a>” of <a title=\"Electronic Medical Records (EMR)\" href=\"https://www.usfhealthonline.com/resources/key-concepts/what-are-electronic-medical-records-emr/\">electronic medical records (EMR)</a>. by January 1, 2014 in order to maintain existing Medicaid and Medicare reimbursement levels.</p><p>There was an update in 2017 that&nbsp;put additional emphasis on data sharing and interoperability. This requirement has EMR vendors scrambling. 74 providers were removed of their authorization for not legally or technologically making data sharing possible. This has many physicians, clinics, and hospitals tending toward the big providers <a href=\"https://kristinmullertranscription.com/epic-data-migration/\">like EPIC</a>.</p><h3>If you’re just now heading into the EMR world, KMTS can convert your paper files to EMR in as little as 2 weeks with the cheapest rates in the industry and best customer service.</h3><p><a href=\"https://kristinmullertranscription.com/contact/\">Choosing KMTS</a> gives you a single point of contact – Kristin. A project manager will be dispatched to your practice to assess the exact needs for your EMR chart abstraction to convert your paper files to EMR. We’ve completed dozens of major EMR Chart Abstraction projects, and trained small practices and large scale hospitals on how to master the EMR.</p><p>If you find you’d like to stay with KMTS, check out our latest offering – <a href=\"https://kristinmullertranscription.com/iscribe-virtual-transcription/\">iScribe</a> – to decrease costs, improve efficiency, and secure privacy</p><p>Kristin and her team performed <a href=\"https://kristinmullertranscription.com/ucla-award-winning-electronic-health-record-system-powered-part-kmts/\">one of the largest conversions of medical paper to electronic records in the nation a few years back with UCLA</a>. However big or small you are, we’ll have your back!</p> <span class=\"cp-load-after-post\"></span>";
$format = "

-- wp_posts
-- Very first time it is created it creates a revision of itself
INSERT INTO `wp_posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES
(%d, 1, '2020-02-09 04:09:37', '2020-02-09 04:09:37', '".$post_content."', 'Convert Paper Files to EMR', '', 'publish', 'open', 'open', '', 'convert-paper-files-to-emr', '', '', '2020-02-09 04:10:30', '2020-02-09 04:10:30', '', 0, 'https://michael.caspianservices.com/heavyhittersmusic/?p=%d', 0, 'post', '', 0),
(%d, 1, '2020-02-09 04:09:37', '2020-02-09 04:09:37', '".$post_content."', 'Convert Paper Files to EMR', '', 'inherit', 'closed', 'closed', '', '%d-revision-v1', '', '', '2020-02-09 04:09:37', '2020-02-09 04:09:37', '', %d, 'https://michael.caspianservices.com/heavyhittersmusic/%d-revision-v1/', 0, 'revision', '', 0);

-- wp_postmeta
-- nothing for post revision because it is just a revision for revision
INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES
(%d, 'gallery_type', 'slider'),
(%d, 'video_format_choose', 'youtube'),
(%d, 'qode_show-sidebar', 'default'),
(%d, 'qode_post_style_masonry_date_image', 'full'),
(%d, 'qode_post_style_masonry_gallery', 'default'),
(%d, 'qode_page_background_image_fixed', 'yes'),
(%d, 'qode_hide-featured-image', 'no'),
(%d, '_wpb_vc_js_status', 'false'),
(%d, '_edit_last', '1'),
(%d, '_qode-like', '0'),
(%d, 'slide_template', 'default'),
(%d, '_edit_lock', '1581222035:1');


-- wp_term_relationships
INSERT INTO `wp_term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES
(%d, 1, 0); -- uncategorized

";
echo sprintf($format,  $p, $p, $p, $p, $p, $pR, 
                       $p, $p, $p, $p, $p,
                       $p, $p, $p, $p, $p,
                       $p, $p, $p, $p);

