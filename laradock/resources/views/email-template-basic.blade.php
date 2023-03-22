@extends('layouts.master-without-nav')

@section('content')

    <div class="row">
        <div class="col-12">
            <table class="body-wrap" align="center"
                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; width: 100%; background-color: transparent; margin: 0;">
                <tr
                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                    <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; margin: 0;"
                        valign="top"></td>
                    <td align="center" class="container"
                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;"
                        valign="top">
                        <div class="content"
                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                            <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope
                                itemtype="http://schema.org/ConfirmAction"
                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; border-radius: 3px; margin: 0; border: none;">
                                <tr
                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                    <td class="content-wrap"
                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; color: #495057; font-size: 16px; vertical-align: top; margin: 0;padding: 30px; box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03); ;border-radius: 7px; background-color: #fff;"
                                        valign="top">
                                        <meta itemprop="name" content="Confirm Email"
                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;" />
                                        <table width="100%" cellpadding="0" cellspacing="0"
                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                            <tr
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                                <td class="content-block"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                    valign="top">
                                                    <img src="{{ $app_url }}/assets/images/logo-dark.png" style="max-width: 125px;"><br><br>
                                                    {!! $body !!}
                                                </td>
                                            </tr>
                                            <!-- <tr
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                                <td class="content-block"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                    valign="top">
                                                    We may need to send you critical information about our service and it is
                                                    important that we have an accurate email address.
                                                </td>
                                            </tr>
                                            <tr
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                                <td class="content-block" itemprop="handler" itemscope
                                                    itemtype="http://schema.org/HttpActionHandler"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                    valign="top">
                                                    <a href="#" itemprop="url"
                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #34c38f; margin: 0; border-color: #34c38f; border-style: solid; border-width: 8px 16px;">Confirm
                                                        email address</a>
                                                </td>
                                            </tr> -->
                                            <tr
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                                <td class="content-block"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                    valign="top">
                                                    <b>Il Team {{ env('APP_TITLE') }}</b>
                                                </td>
                                            </tr>

                                            <tr
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; margin: 0;">
                                                <td class="content-block"
                                                    style="text-align: center;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; margin: 0; padding: 0;"
                                                    valign="top">
                                                    © {{ date('Y') }} {{ env('APP_TITLE') }}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
            <!-- end table -->
        </div>
    </div>
    <!-- end row -->

@endsection