<?php
class LukeFileWalker {
    public $scanned_directories = [];
    public $post_data = [];
    public $post_id; // keeps track of the post id of the blog posts
    
    public function __construct($dir, $start_id) 
    {
        $this->post_id = $start_id;
        // exclude .. and . directories in linux
        $scanned_items = array_diff(scandir($dir), array('..', '.'));

        // loop through scanned items in directory
        foreach ( $scanned_items as $key => $item )
        {
            if ($item == null ) continue;

            $item_path = $dir .'/'.$item;            
            if ( $this->item_is_directory($item_path) ) 
            {
                // added to directories list that need to be scanned
                $this->scanned_directories[$item_path] = false;
            } 
            else if ( $this->item_is_file($item_path))  
            {

            }
        }

        foreach ( $this->scanned_directories as $item_path => $scanned_directory )
        {
            if ( $this->directory_has_not_been_visited( $item_path ) )
            {
                $this->scan($item_path);
            }
        }
        var_dump($this->post_data);
    }

    private function scan($dir) {
        // we mark the visited dir as true since were already inside scanning
        $this->scanned_directories[$dir] = true;
        // exclude .. and . directories in linux
        $scanned_items = array_diff(scandir($dir), array('..', '.'));

        // loop through scanned items in directory
        foreach ( $scanned_items as $key => $item){
            if ($item == null ) continue;
            $item_path = $dir .'/'.$item;            
            if ( $this->item_is_directory($item_path) ) 
            {
                // added to directories list that need to be scanned
                $this->scanned_directories[$item_path] = false;
            } 
            else if ( $this->item_is_file($item_path))  
            {
                echo $item."\n"."\n";
                if (strpos($item, '-entry-content.txt') !== false) {
                    // get file content this is the post_content
                    $pieces = explode("/", $item_path);
                    $n = sizeof($pieces) - 2;
                    $post_name = $pieces[$n];
                    $this->post_data[$this->post_id]['post_id'] = $this->post_id;
                    $this->post_data[$this->post_id]['post_name'] = $post_name; 
                    $entry_title_txt_file = '/'.$pieces[1].'/'.$pieces[2].'/'.$pieces[3].'/'.$pieces[4].'/'.$pieces[5].'/'.$pieces[6].'/entry-title.txt';
                    // var_dump($entry_title_txt_file); die();
                    $this->post_data[$this->post_id ]['post_title'] = file_get_contents($entry_title_txt_file); 
                    $this->post_id += 2;
                }
            }
        }

        foreach ( $this->scanned_directories as $item_path => $scanned_directory )
        {
            if ( $this->directory_has_not_been_visited( $item_path ) )
            {
                $this->scan($item_path);
            }
        }
    }

    private function item_is_directory($item_path){
        return is_dir($item_path);
    }
    private function item_is_file($item_path){
        return is_file($item_path);
    }
    private function directory_has_not_been_visited($dir) {
        return $this->scanned_directories[$dir] === false ;
    }


}
new LukeFileWalker('/Users/michaelknight/Desktop/broken-links-checker/ScrapedContent', 15484);