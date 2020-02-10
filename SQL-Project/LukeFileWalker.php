<?php
class LukeFileWalker {
    public $scanned_directories = [];

    public function __construct($dir) {
        // we mark the visited dir as true since were already inside scanning
        // $this->scanned_directories[$dir] = true;
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

            }
        }

        foreach ( $this->scanned_directories as $item_path => $scanned_directory){
            if ( $this->directory_has_not_been_visited( $item_path ) ){
                $this->scan($item_path);
            }
        }
        //  var_dump($this->scanned_directories);


    }

    private function scan($dir) {
        // we mark the visited dir as true since were already inside scanning
        $this->scanned_directories[$dir] = true;
        // exclude .. and . directories in linux
        $scanned_items = array_diff(scandir($dir), array('..', '.'));
        // var_dump($scanned_items);
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
            }
        }

        foreach ( $this->scanned_directories as $item_path => $scanned_directory){
            if ( $this->directory_has_not_been_visited( $item_path ) ){
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
        // if ( ! isset( $this->scanned_directories[$dir]) ) {
        //     $this->scanned_directories[$dir] = false;
        //     return true;
        // }
        return $this->scanned_directories[$dir] === false ;
    }


}
new LukeFileWalker('/Users/michaelknight/Desktop/broken-links-checker/ScrapedContent');