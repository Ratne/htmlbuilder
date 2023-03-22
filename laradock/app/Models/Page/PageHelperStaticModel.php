<?php

namespace App\Models\Page;

use App\Models\Accessor\Header;
use App\Models\HasPage;
use App\Models\Accessor\Modal;
use App\Models\ParentModel;
use DOMDocument;
use DOMNode;
use Exception;

class PageHelperStaticModel extends ParentModel
{
  protected static function composeFinalPageIfExistingFromOriginal(Page $page)
  {
    try {
      $dom = new DOMDocument();
      $dom->loadHTMLFile(self::$final_path . self::ORIGINAL_EXTENSION, LIBXML_NOERROR);
      $settings = auth()->user()->settings()->first();

      /**
       * Body opening tag
       */
      if(!empty($settings)) self::appendCustomCode($dom,$settings->bodyOpenCode,'body',true);

      if ($page->has && $page->has->count()) {
        foreach ($page->has as $item) {
          self::composeAccessors($dom, $item, $item->type == Header::class);
        }
      }

      /**
       * General settings for head
       */
      if (!empty($settings)) self::appendCustomCode($dom, $settings->headCode);
      /**
       * Head for specific page
       */
      if (!empty($page->head)) self::appendCustomCode($dom, $page->head);
      self::appendStyle($dom, 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
      self::appendScript($dom, 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
      self::appendScript($dom, 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');

      /**
       * Body closing tag
       */
      if(!empty($settings)) self::appendCustomCode($dom,$settings->bodyCloseCode,'body');

      /**
       * TODO: same thing for modals (1 to many)
       */

      $dom->saveHTMLFile(self::$final_path);
    } catch (Exception $e) {
    }
  }

  private static function appendCustomCode(DOMDocument $dom, ?string $html, string $type = 'head', bool $isBefore = false)
  {
    if(empty($html)) return;

    $element = $dom->getElementsByTagName($type)->item(0);
    $elementFragment = self::appendHTML($element,$html);
    if($isBefore) $element->insertBefore($elementFragment,$element->firstChild);
    else $element->appendChild($elementFragment);
  }

  private static function appendStyle(DOMDocument $dom, string $href)
  {
    $head = $dom->getElementsByTagName('head')->item(0);
    $link = $dom->createElement('link');
    $link->setAttribute('href', $href);
    $link->setAttribute('rel','stylesheet');
    $link->setAttribute('type','text/css');
    $head->appendChild($link);
  }

  private static function appendScript(DOMDocument $dom, string $src)
  {
    $body = $dom->getElementsByTagName('body')->item(0);
    $script = $dom->createElement('script');
    $script->setAttribute('src', $src);
    $body->appendChild($script);
  }

  private static function appendHTML(DOMNode $parent, $source)
  {
    if(empty($source)) return $parent;

    $tmpDoc = new DOMDocument();
    $tmpDoc->loadHTML($source);
    foreach ($tmpDoc->getElementsByTagName('body')->item(0)->childNodes as $node) {
      $node = $parent->ownerDocument->importNode($node, true);
      $parent->appendChild($node);
    }
    return $parent;
  }

  /**
   * Merge header, footer and modals
   */
  private static function composeAccessors(DomDocument &$dom, HasPage $first, bool $isInsertBefore = false)
  {
    $isModal = $first->type == Modal::class;
    $type = strtolower(array_reverse(explode('\\', $first->type))[0]);
    $element_path = $first->{$type}->getAbsolutePath();
    $element_content = file_get_contents($element_path);
    $element = $dom->createElement($isModal ? 'div' : $type);

    $body = $dom->getElementsByTagName('body')->item(0);

    if ($isModal) {
      $element->setAttribute('id', 'modal-' . $first->object_id);
      $element->setAttribute('class', 'modal');
      
      $modal_dialog = $dom->createElement('div');
      $modal_dialog->setAttribute('class','modal-dialog');
      $modal_content = $dom->createElement('div');
      $modal_content->setAttribute('class','modal-content');
      $modal_content->setAttribute('id','modal-content-'.$first->object_id);
      self::appendHTML($modal_content,$element_content);
      $modal_dialog->appendChild($modal_content);
    }

    if (!$isInsertBefore) {
      $body->appendChild(self::appendHTML($element, $isModal ? '' : $element_content));
    } else {
      $body->insertBefore(self::appendHTML($element, $isModal ? '' : $element_content), $dom->getElementsByTagName('div')->item(0));
    }

    if($isModal){
      $element->appendChild($modal_dialog);
    }

    /**
     * Set header inline styles
     */
    $head = $dom->getElementsByTagName('head')->item(0);
    $element_content = explode('text/css">', explode('</style>', $element_content)[0])[1];
    $style = $dom->createElement('style');
    $style->setAttribute('type', 'text/css');
    $style->textContent = $element_content;
    $head->appendChild(
      $head->firstChild->appendChild($style)
    );
  }
}
